#!/usr/bin/env node
// Replace music while preserving encoded video frames and the original voice timing.
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import{fileURLToPath}from'node:url';import{execFileSync}from'node:child_process';
const dir=path.dirname(fileURLToPath(import.meta.url)),tmp=fs.mkdtempSync(path.join(os.tmpdir(),'acr-vibrant-'));
const tl=JSON.parse(fs.readFileSync(path.join(dir,'vo/timeline.json')));
const ff=args=>execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error',...args],{stdio:'inherit'});
const music=path.join(tmp,'music.wav'),voice=path.join(tmp,'voice.wav'),mix=path.join(tmp,'mix.wav');
execFileSync('node',[path.join(dir,'music.mjs'),music],{stdio:'inherit'});
const ins=tl.vo.flatMap(v=>['-i',path.join(dir,v.file)]);
const places=tl.vo.map((v,i)=>`[${i}:a]aresample=48000,aformat=channel_layouts=stereo,adelay=${Math.round(v.start*1000)}|${Math.round(v.start*1000)}[v${i}]`).join(';');
ff([...ins,'-filter_complex',`${places};${tl.vo.map((_,i)=>`[v${i}]`).join('')}amix=inputs=${tl.vo.length}:normalize=0,apad=whole_dur=${tl.dur}[vo]`,'-map','[vo]','-t',String(tl.dur),voice]);
ff(['-i',music,'-i',voice,'-filter_complex','[0:a]aresample=48000,loudnorm=I=-19:TP=-2:LRA=8,equalizer=f=1800:t=o:w=2:g=-3,volume=0.45[m];[1:a]asplit=2[v1][v2];[m][v1]sidechaincompress=threshold=0.025:ratio=3:attack=15:release=180[md];[md][v2]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=10[a]','-map','[a]','-ar','48000','-t',String(tl.dur),mix]);
for(const [source,target]of[['homepage-cut.mp4','acr-aomi-vibrant.mp4'],['homepage-cut-preview.mp4','acr-aomi-vibrant-preview.mp4']]){ff(['-i',path.join(dir,source),'-i',mix,'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-t',String(tl.dur),'-movflags','+faststart',path.join(dir,target)]);console.log(target);}
