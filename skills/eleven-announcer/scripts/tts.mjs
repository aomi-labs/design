#!/usr/bin/env node
// Voices each walkthrough step's `say` line as its own clip, with word timings.
//
//   ELEVEN_API_KEY=… ELEVEN_VOICE_ID=… node tts.mjs <production-dir> [--force] [step ids…]
//   node tts.mjs <production-dir> --draft      (macOS `say` voice for dry runs: no key, no credits)
//
// Writes vo/stepNN.mp3 and vo/stepNN.json (character alignment). Draft timings are estimated.
// The key comes from the environment only. Never write it into a file.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2), dir = path.resolve(args.find(a => !a.startsWith('--') && !/^\d+$/.test(a)) || '.');
const draft = args.includes('--draft'), force = args.includes('--force') || draft, only = args.filter(a => /^\d+$/.test(a)).map(Number);
const { STEPS } = await import(pathToFileURL(path.join(dir, 'walkthrough.mjs')).href);
const lines = STEPS.filter(s => s.say);
const KEY = process.env.ELEVEN_API_KEY, VOICE = process.env.ELEVEN_VOICE_ID, MODEL = process.env.ELEVEN_MODEL || 'eleven_multilingual_v2';
if (!draft && (!KEY || !VOICE)) { console.error('set ELEVEN_API_KEY and ELEVEN_VOICE_ID, or pass --draft'); process.exit(1); }
fs.mkdirSync(path.join(dir, 'vo'), { recursive: true });

for (const [i, st] of lines.entries()) {
  const base = path.join(dir, 'vo', `step${String(st.id).padStart(2, '0')}`);
  if (only.length ? !only.includes(st.id) : (fs.existsSync(`${base}.mp3`) && !force)) continue;
  if (draft) {
    const aiff = path.join(os.tmpdir(), `ea-${process.pid}-${st.id}.aiff`);
    execFileSync('say', ['-r', '175', '-o', aiff, st.say]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', aiff, '-ar', '44100', '-ac', '1', '-b:a', '96k', `${base}.mp3`]); fs.rmSync(aiff);
    const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `${base}.mp3`]).toString();
    const chars = [...st.say], per = (dur - .15) / chars.length; // spread characters evenly: good enough for a draft
    fs.writeFileSync(`${base}.json`, JSON.stringify({ characters: chars, character_start_times_seconds: chars.map((_, k) => .05 + k * per), character_end_times_seconds: chars.map((_, k) => .05 + (k + 1) * per) }));
  } else {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
      method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: st.say, model_id: MODEL, seed: 7, previous_text: lines[i - 1]?.say, next_text: lines[i + 1]?.say,
        voice_settings: { stability: .5, similarity_boost: .75, style: 0, use_speaker_boost: true } }),
    });
    if (!res.ok) { console.error(`step ${st.id}: HTTP ${res.status}`, (await res.text()).slice(0, 300)); process.exit(1); }
    const j = await res.json();
    fs.writeFileSync(`${base}.mp3`, Buffer.from(j.audio_base64, 'base64')); fs.writeFileSync(`${base}.json`, JSON.stringify(j.alignment));
  }
  console.log(`step ${st.id} voiced${draft ? ' (draft)' : ''}`);
}
