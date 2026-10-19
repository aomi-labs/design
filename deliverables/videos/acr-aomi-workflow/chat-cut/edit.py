from pathlib import Path
import json, subprocess, shutil, re
from PIL import Image, ImageDraw, ImageFont
D=Path(__file__).resolve().parent; O=D.parent/'homepage-cut'; W=D/'work'; W.mkdir(exist_ok=True)
def run(a): subprocess.run(a,check=True)
def ff(a):
 a=[re.sub(r",?subtitles=.*?force_style='[^']*'",'',x) if isinstance(x,str) and 'subtitles=' in x else x for x in a]
 a=['null' if x=='' and i and a[i-1]=='-vf' else x for i,x in enumerate(a)]
 run(['ffmpeg','-y','-hide_banner','-loglevel','error']+list(map(str,a)))
def duration(p): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(p)]))
def stamp(t):
 m,s=divmod(round(t*1000),60000); h,m=divmod(m,60);return f'{h:02}:{m:02}:{s//1000:02},{s%1000:03}'
def srt(cues):return '\n\n'.join(f'{i+1}\n{stamp(s)} --> {stamp(e)}\n{t}' for i,(s,e,t) in enumerate(cues))+'\n'
old=json.loads((O/'vo/timeline.json').read_text()); scenes=[]
# Genuine browser capture: intro, live response, expanded traces, interpretation.
for n in range(1,5):
 a=D/f'vo/step{n:02}.mp3'; dur=duration(a)+.8
 if n==2: dur=max(dur,20)
 scenes.append({'n':n,'audio':str(a),'dur':dur})
tail=[(3,29.663,46.81),(4,46.81,66.743),(5,66.743,81.522),(7,95.975,110.8),(8,110.8,128)]
other=scenes[0]['dur']+sum(e-s for _,s,e in tail)
chat=sum(s['dur'] for s in scenes[1:]); scenes[3]['dur']+=max(0,other*2/3-chat)
allcues=[]; voices=[]; t=0; clips=[]
for st in scenes:
 n=st['n']; dur=st['dur']; align=json.loads((D/f'vo/step{n:02}.json').read_text())
 chars=align['characters']; starts=align['character_start_times_seconds']; ends=align['character_end_times_seconds']; cues=[]; b=0
 for k,c in enumerate(chars):
  if (c==' ' and k-b>=45) or k==len(chars)-1:
   txt=''.join(chars[b:k+1]).strip().replace('A C R','ACR');cues.append((starts[b]+.15,ends[k]+.3,txt));b=k+1
 sub=W/f'{n}.srt';sub.write_text(srt(cues));allcues.extend((t+s,t+e,txt) for s,e,txt in cues)
 out=W/f'{n}.mp4'; common=['-an','-r','30','-t',dur,'-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p',out]
 filt=f"scale=-2:960,pad=1920:1080:(ow-iw)/2:20:color=0x030d23,setsar=1,subtitles={sub}:force_style='FontName=Arial,FontSize=22,PrimaryColour=&H00FFFFFF,OutlineColour=&H00180C03,BorderStyle=3,Outline=1,MarginV=16'"
 if n==1:
  ff(['-ss','3','-i',O/'homepage-cut.mp4','-vf',f"crop=1920:920:0:0,scale=1920:1035,pad=1920:1080:0:0:color=0x030d23,subtitles={sub}:force_style='FontName=Arial,FontSize=22,BorderStyle=3,MarginV=16'",*common])
 elif n==2:
  ff(['-framerate','4','-i',D/'live/%04d.jpg','-vf',filt+f',tpad=stop_mode=clone:stop_duration={dur}',*common])
 else:
  imgs=['02-bill-tool.jpg','03-rate-tool.jpg'] if n==3 else ['05-recommendation.jpg','04-result.jpg']
  parts=[]
  for j,img in enumerate(imgs):
   part=W/f'still-{n}-{j}.mp4';ff(['-loop','1','-i',D/'captures'/img,'-vf','scale=-2:960,pad=1920:1080:(ow-iw)/2:20:color=0x030d23,setsar=1','-an','-t',dur/2,'-r','30','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p',part]);parts.append(part)
  listing=W/f'parts{n}.txt';listing.write_text(''.join(f"file '{p}'\n" for p in parts));ff(['-f','concat','-safe','0','-i',listing,'-vf',f"subtitles={sub}:force_style='FontName=Arial,FontSize=22,BorderStyle=3,MarginV=16'",*common])
 # Burn accurate timed subtitles as a transparent PNG sequence; ffmpeg build has no libass.
 capdir=W/f'caps{n}';capdir.mkdir(exist_ok=True);listing=[];previous=0
 font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',34)
 def card(text,i):
  im=Image.new('RGBA',(1920,110),(0,0,0,0));dr=ImageDraw.Draw(im)
  if text:
   box=dr.textbbox((0,0),text,font=font);width=box[2]-box[0]
   dr.rounded_rectangle((960-width/2-20,25,960+width/2+20,87),12,fill=(3,13,35,240));dr.text((960,56),text,font=font,fill='white',anchor='mm')
  name=capdir/f'{i}.png';im.save(name);return name
 idx=0
 for cs,ce,txt in cues:
  if cs>previous:
   img=card('',idx);idx+=1;listing.extend([f"file '{img}'",f'duration {cs-previous}'])
  ce=min(ce,dur);img=card(txt,idx);idx+=1;listing.extend([f"file '{img}'",f'duration {ce-cs}']);previous=ce
 if previous<dur:
  img=card('',idx);listing.extend([f"file '{img}'",f'duration {dur-previous}'])
 listing.append(f"file '{img}'");lst=capdir/'list.txt';lst.write_text('\n'.join(listing))
 cap=W/f'captions{n}.mov';ff(['-f','concat','-safe','0','-i',lst,'-r','30','-c:v','qtrle','-t',dur,cap])
 burned=W/f'burned{n}.mp4';ff(['-i',out,'-i',cap,'-filter_complex','[0:v][1:v]overlay=0:970:eof_action=repeat','-an','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p',burned]);out=burned
 clips.append(out);voices.append({'file':st['audio'],'start':t+.15}); t+=dur
for n,s,e in tail:
 out=W/f'tail-{n}.mp4';ff(['-ss',s,'-i',O/'homepage-cut.mp4','-t',e-s,'-an','-c:v','libx264','-preset','veryfast','-crf','20','-r','30',out]);clips.append(out)
 original=next(v for v in old['vo'] if v['id']==n);voices.append({'file':str(O/original['file']),'start':t+original['start']-s})
 allcues.extend((t+c['s']-s,t+c['e']-s,c['text']) for c in old['cues'] if s<=c['s']<e);t+=e-s
(D/'vo/timeline.json').write_text(json.dumps({'dur':t,'vo':voices,'cues':[{'s':s,'e':e,'text':x} for s,e,x in allcues]},indent=2))
(D/'chat-cut.srt').write_text(srt(allcues));(W/'concat.txt').write_text(''.join(f"file '{p}'\n" for p in clips))
ff(['-f','concat','-safe','0','-i',W/'concat.txt','-c','copy',W/'silent.mp4'])
shutil.copy(O/'music.mjs',D/'music.mjs');run(['node',str(D/'music.mjs'),str(W/'music.wav')])
ins=sum((['-i',v['file']] for v in voices),[]);parts=';'.join(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={round(v["start"]*1000)}|{round(v["start"]*1000)}[v{i}]' for i,v in enumerate(voices)); mix=''.join(f'[v{i}]' for i in range(len(voices)))
ff(ins+['-filter_complex',parts+f';{mix}amix=inputs={len(voices)}:normalize=0,apad=whole_dur={t}[v]','-map','[v]','-t',t,W/'voice.wav'])
ff(['-i',W/'music.wav','-i',W/'voice.wav','-filter_complex','[0:a]aresample=48000,loudnorm=I=-19:TP=-2:LRA=8,equalizer=f=1800:t=o:w=2:g=-3,volume=0.45[m];[1:a]asplit=2[v1][v2];[m][v1]sidechaincompress=threshold=0.025:ratio=3:attack=15:release=180[md];[md][v2]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=10[a]','-map','[a]','-ar','48000','-t',t,W/'mix.wav'])
ff(['-i',W/'silent.mp4','-i',W/'mix.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-t',t,'-movflags','+faststart',D/'acr-aomi-chat-cut.mp4'])
chat=sum(s['dur'] for s in scenes[1:]);(D/'verification.json').write_text(json.dumps({'duration_s':t,'chat_starts_s':scenes[0]['dur'],'chat_duration_s':chat,'chat_fraction':chat/t,'source':'Real Chrome UI session; 20 seconds captured at 4 fps, followed by held captures of expanded real tool records and response. No simulated chat.','tools':['acr_check_bill','acr_rate'],'payment_submitted':False},indent=2));print('DONE',t,chat/t)
