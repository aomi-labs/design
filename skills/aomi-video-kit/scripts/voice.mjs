#!/usr/bin/env node
// The team voice. One ElevenLabs clip per line, with word timings, using the voice and settings in kit.json.
//
//   ELEVEN_API_KEY=… node voice.mjs <production-dir> [--force] [ids…]
//   node voice.mjs <production-dir> --draft          macOS `say` stand-in: no key, no credits, timings estimated
//
// Finds the lines in the production folder:
//   walkthrough.mjs  (eleven-announcer)  STEPS[].say   → vo/stepNN.mp3 + .json
//   vo/script.mjs    (slide-to-video)    LINES[].text  → vo/lineNN.mp3 + .json
// Existing clips are kept unless --force or their ids are given, so editing one line re-voices only that line.
// The key comes from the environment only; never write it into a file. ELEVEN_VOICE_ID / ELEVEN_MODEL override the kit.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { KIT } from './kit.mjs';

const args = process.argv.slice(2), dir = path.resolve(args.find(a => !a.startsWith('--') && !/^\d+$/.test(a)) || '.');
const draft = args.includes('--draft'), force = args.includes('--force') || draft, only = args.filter(a => /^\d+$/.test(a)).map(Number);

export async function linesOf(dir) {
  if (fs.existsSync(path.join(dir, 'walkthrough.mjs'))) {
    const { STEPS } = await import(pathToFileURL(path.join(dir, 'walkthrough.mjs')).href);
    return { prefix: 'step', lines: STEPS.filter(s => s.say).map(s => ({ id: s.id, text: s.say })) };
  }
  const { LINES } = await import(pathToFileURL(path.join(dir, 'vo/script.mjs')).href);
  return { prefix: 'line', lines: LINES.map(l => ({ id: l.id, text: l.text })) };
}

const V = KIT.voice, KEY = process.env[V.env.key], VOICE = process.env[V.env.id] || V.id, MODEL = process.env[V.env.model] || V.model;
if (!draft && !KEY) { console.error(`set ${V.env.key} (ask the team), or pass --draft for a dry run`); process.exit(1); }
const { prefix, lines } = await linesOf(dir);
fs.mkdirSync(path.join(dir, 'vo'), { recursive: true });

for (const [i, L] of lines.entries()) {
  const base = path.join(dir, 'vo', `${prefix}${String(L.id).padStart(2, '0')}`);
  if (only.length ? !only.includes(L.id) : (fs.existsSync(`${base}.mp3`) && !force)) continue;
  if (draft) {
    const aiff = path.join(os.tmpdir(), `aomi-voice-${process.pid}-${L.id}.aiff`);
    const sayVoice = process.env.EA_SAY_VOICE, sayRate = process.env.EA_SAY_RATE || '175'; // a macOS voice and words per minute for drafts
    execFileSync('say', [...(sayVoice ? ['-v', sayVoice] : []), '-r', sayRate, '-o', aiff, L.text]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', aiff, '-ar', '44100', '-ac', '1', '-b:a', '96k', `${base}.mp3`]); fs.rmSync(aiff);
    const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `${base}.mp3`]).toString();
    const chars = [...L.text], per = (dur - .15) / chars.length; // characters spread evenly: good enough for a draft
    fs.writeFileSync(`${base}.json`, JSON.stringify({ draft: true, characters: chars, character_start_times_seconds: chars.map((_, k) => .05 + k * per), character_end_times_seconds: chars.map((_, k) => .05 + (k + 1) * per) }));
  } else {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=${V.output_format}`, {
      method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: L.text, model_id: MODEL, seed: V.seed, voice_settings: V.settings,
        previous_text: lines[i - 1]?.text, next_text: lines[i + 1]?.text }), // neighbours keep the read continuous across clips
    });
    if (!res.ok) { console.error(`${prefix} ${L.id}: HTTP ${res.status}`, (await res.text()).slice(0, 300)); process.exit(1); }
    const j = await res.json();
    fs.writeFileSync(`${base}.mp3`, Buffer.from(j.audio_base64, 'base64')); fs.writeFileSync(`${base}.json`, JSON.stringify(j.alignment));
  }
  console.log(`${prefix} ${L.id} voiced${draft ? ' (draft)' : ''}`);
}
