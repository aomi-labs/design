#!/usr/bin/env node
// Mixes and encodes the final video to the kit's delivery spec.
//
//   node finish.mjs <production-dir> <frames-dir> [--music music.wav] [--no-voice]
//
// · places every voice clip at its start time (vo/timeline.json)
// · ducks the music under the voice (sidechain) and levels the mix to the kit's loudness (-16 LUFS)
// · encodes <slug>.mp4 and <slug>-preview.mp4 (small enough to send to a phone)
// The bed is the production's own music.mjs when it has one, else the kit's signature bed (music.mjs here).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { KIT, KIT_DIR } from './kit.mjs';

const args = process.argv.slice(2), [dirArg, framesArg] = args.filter(a => !a.startsWith('--'));
const opt = k => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined; };
if (!dirArg || !framesArg) { console.log('usage: finish.mjs <production-dir> <frames-dir> [--music music.wav] [--no-voice]'); process.exit(2); }
const dir = path.resolve(dirArg), frames = path.resolve(framesArg), slug = path.basename(dir);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `${slug}-mix-`));
const ff = a => execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...a], { stdio: 'inherit' });
const { fps } = KIT.frame, MIX = KIT.mix, ENC = KIT.encode;
const voiced = !args.includes('--no-voice') && fs.existsSync(path.join(dir, 'vo/timeline.json'));
const tl = voiced ? JSON.parse(fs.readFileSync(path.join(dir, 'vo/timeline.json'), 'utf8')) : null;
const frameCount = fs.readdirSync(frames).filter(f => /^f\d{5}\.jpg$/.test(f)).length;
const duration = tl ? tl.dur : frameCount / fps;

let music = opt('music') && path.resolve(opt('music'));
if (!music) {
  music = path.join(tmp, 'music.wav');
  const own = path.join(dir, 'music.mjs'), script = fs.existsSync(own) ? own : path.join(KIT_DIR, 'scripts/music.mjs');
  execFileSync('node', [script, music, '--dur', String(duration), '--outro', String(KIT.outro.seconds)], { cwd: dir, stdio: 'inherit' });
}

const mix = path.join(tmp, 'mix.wav'), loud = `loudnorm=I=${MIX.lufs}:TP=${MIX.true_peak}:LRA=${MIX.lra}`;
if (tl) {
  const ins = tl.vo.flatMap(v => ['-i', path.join(dir, v.file)]);
  const place = tl.vo.map((v, i) => `[${i}:a]aresample=48000,aformat=channel_layouts=stereo,adelay=${Math.round(v.start * 1000)}|${Math.round(v.start * 1000)}[v${i}]`).join(';');
  const voice = path.join(tmp, 'voice.wav');
  ff([...ins, '-filter_complex', `${place};${tl.vo.map((_, i) => `[v${i}]`).join('')}amix=inputs=${tl.vo.length}:normalize=0,apad=whole_dur=${duration}[vo]`, '-map', '[vo]', '-t', String(duration), voice]);
  const d = MIX.duck; // music sits well under the voice, swells back up between lines
  ff(['-i', music, '-i', voice, '-filter_complex', `[0:a]aresample=48000,volume=${KIT.music.bed_gain}[m];[1:a]asplit=2[v1][v2];[m][v1]sidechaincompress=threshold=${d.threshold}:ratio=${d.ratio}:attack=${d.attack}:release=${d.release}[md];[md][v2]amix=inputs=2:normalize=0,${loud}[a]`, '-map', '[a]', '-ar', '48000', mix]);
} else {
  ff(['-i', music, '-af', loud, '-ar', '48000', mix]);
}
const full = path.join(dir, `${slug}.mp4`), preview = path.join(dir, `${slug}-preview.mp4`);
ff(['-framerate', String(fps), '-i', path.join(frames, 'f%05d.jpg'), '-i', mix, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(ENC.crf), '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '192k', '-t', String(duration), full]);
ff(['-i', full, '-c:v', 'libx264', '-preset', 'slow', '-crf', String(ENC.preview_crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'copy', preview]);
const mb = f => (fs.statSync(f).size / 1048576).toFixed(1);
console.log(`${full} (${mb(full)} MB)\n${preview} (${mb(preview)} MB)\n${frameCount} frames · ${duration}s${tl ? ` · ${tl.cues.length} subtitle cues` : ''}`);
if (frameCount < Math.round(duration * fps) - 1) console.warn(`only ${frameCount} frames for ${duration}s: render the missing range before sharing`);
if (+mb(preview) > ENC.preview_max_mb) console.warn(`preview is ${mb(preview)} MB, over the ${ENC.preview_max_mb} MB that reaches a phone`);
