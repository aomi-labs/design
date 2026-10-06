#!/usr/bin/env node
// Generates one ElevenLabs clip per voice-over line, with per-character timestamps.
//
//   ELEVEN_API_KEY=… ELEVEN_VOICE_ID=… node tts.mjs <project-dir> [--force] [line ids…]
//
// Reads <project-dir>/vo/script.mjs, writes vo/lineNN.mp3 + vo/lineNN.json (alignment).
// Existing clips are kept unless --force (or their ids) are given, so editing one line re-voices only that line.
// The key is read from the environment only. Never write it into a file in the project.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2), dir = path.resolve(args.find(a => !a.startsWith('--') && !/^\d+$/.test(a)) || '.');
const KEY = process.env.ELEVEN_API_KEY, VOICE = process.env.ELEVEN_VOICE_ID, MODEL = process.env.ELEVEN_MODEL || 'eleven_multilingual_v2';
if (!KEY || !VOICE) { console.error('set ELEVEN_API_KEY and ELEVEN_VOICE_ID in the environment'); process.exit(1); }
const { LINES } = await import(pathToFileURL(path.join(dir, 'vo/script.mjs')).href);
const force = args.includes('--force'), only = args.filter(a => /^\d+$/.test(a)).map(Number);

for (const [i, L] of LINES.entries()) {
  const base = path.join(dir, 'vo', `line${String(L.id).padStart(2, '0')}`);
  if (only.length ? !only.includes(L.id) : (fs.existsSync(`${base}.mp3`) && !force)) continue;
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: L.text, model_id: MODEL, seed: 7,
      // neighbouring lines keep the read continuous across separately generated clips
      previous_text: LINES[i - 1]?.text, next_text: LINES[i + 1]?.text,
      voice_settings: { stability: .5, similarity_boost: .75, style: 0, use_speaker_boost: true },
    }),
  });
  if (!res.ok) { console.error(`line ${L.id}: HTTP ${res.status}`, (await res.text()).slice(0, 300)); process.exit(1); }
  const j = await res.json();
  fs.writeFileSync(`${base}.mp3`, Buffer.from(j.audio_base64, 'base64'));
  fs.writeFileSync(`${base}.json`, JSON.stringify(j.alignment));
  console.log(`line ${L.id} voiced`);
}
