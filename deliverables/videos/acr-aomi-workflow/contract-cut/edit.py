from pathlib import Path
import json,subprocess,math,shutil,re
from PIL import Image,ImageDraw,ImageFont,ImageOps
D=Path(__file__).resolve().parent; P=D.parent; W=D/'work'; W.mkdir(exist_ok=True)
FONT='/System/Library/Fonts/Supplemental/Arial.ttf';font=ImageFont.truetype(FONT,32);small=ImageFont.truetype(FONT,24)
BG=(3,13,35);FPS=15
steps=json.loads((D/'walkthrough.mjs').read_text().split('=',1)[1].strip().rstrip(';'))
def ff(a):subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error',*map(str,a)],check=True)
def dur(p):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(p)]))
def stamp(t):
 ms=round(t*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000);return f'{h:02}:{m:02}:{s:02},{ms:03}'
names_old=['intro','bill','evidence','registration','workflow','workflow-refined','widget','return']
recordings={name:sorted((P/'paced-cut'/(name+'-recording')).glob('*.jpg')) for name in names_old}
recordings.update({name:sorted((D/(name+'-recording')).glob('*.jpg')) for name in ['contract','checks','rust']})
def source(n,t,length):
 names={1:['intro'],2:['contract'],3:['bill','evidence'],4:['checks'],5:['workflow-refined'],6:['rust'],7:['registration','workflow-refined'],8:['widget','return']}
 if n==9:return None
 frames=[p for name in names[n] for p in recordings[name]]
 return frames[min(len(frames)-1,int(t/length*len(frames)))]
def speech_end(audio):
 log=subprocess.run(['ffmpeg','-hide_banner','-i',str(audio),'-af','silencedetect=noise=-40dB:d=0.15','-f','null','-'],capture_output=True,text=True).stderr
 starts=re.findall(r'silence_start: ([0-9.]+)',log);ends=re.findall(r'silence_end: ([0-9.]+)',log)
 total=dur(audio)
 return float(starts[-1]) if starts and ends and abs(float(ends[-1])-total)<.1 else total
cuesall=[];voices=[];scenes=[];clips=[];offset=0;scalings={}
for st in steps:
 n=st['id'];audio=D/f'vo/step{n:02}.mp3';length=speech_end(audio)+.32
 length=math.ceil(length*FPS)/FPS
 a=json.loads((D/f'vo/step{n:02}.json').read_text());chars=a['characters'];cues=[];b=0
 for k,c in enumerate(chars):
  if (c==' ' and k-b>51) or k==len(chars)-1:
   text=''.join(chars[b:k+1]).strip().replace('A C R','ACR').replace('A P I','API').replace('A I','AI').replace('G P U','GPU').replace('U S D C','USDC');cues.append((a['character_start_times_seconds'][b]+.12,a['character_end_times_seconds'][k]+.22,text));b=k+1
 cuesall.extend({'s':offset+s,'e':offset+e,'text':x} for s,e,x in cues)
 voices.append({'file':str(audio),'start':offset+.12});scenes.append({'id':n,'start':offset,'duration':length,'title':st['title']})
 out=W/f'scene{n}.mp4';proc=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s','1920x1080','-r',str(FPS),'-i','-','-an','-vf','setsar=1','-r','30','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p',str(out)],stdin=subprocess.PIPE)
 last=None;base=None;last_focus=None
 for frame in range(round(length*FPS)):
  t=frame/FPS;src=source(n,t,length)
  focus=n in [2,4,5] and int(t/3.5)%2==1
  if base is None or src!=last or focus!=last_focus:
   base=Image.new('RGB',(1920,1080),BG);dr=ImageDraw.Draw(base)
   if src:
    im=Image.open(src).convert('RGB')
    if focus:im=im.crop((int(im.width*.22),int(im.height*.17),im.width,int(im.height*.81)))
    fit=ImageOps.contain(im,(1840,920),Image.Resampling.LANCZOS);xy=((1920-fit.width)//2,65+(920-fit.height)//2);base.paste(fit,xy)
    scalings[str(src)]={'source':im.size,'display':fit.size,'scale_error':abs(fit.width/im.width-fit.height/im.height)}
    label='LIVE CHAT · EDITED CAPTURE' if n == 3 else 'GITHUB · IMPLEMENTATION WALKTHROUGH' if n in [2,4,5,6,7,8] else 'ACR · ARC COMPUTE RATE'
    dr.text((42,28),label,font=small,fill=(194,210,229),anchor='lm')
    if n in [4,5]:dr.text((1878,28),'Payment deployment acceptance pending',font=small,fill=(194,210,229),anchor='rm')
   else:
    logo=Image.open(D/'aomi-mark-white.png').convert('RGBA');base.paste(logo,(735,330),logo)
    dr.text((940,420),'aomi',font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf',112),fill='white',anchor='lm')
    dr.text((960,580),'ACR × Aomi',font=ImageFont.truetype(FONT,46),fill='white',anchor='mm')
    dr.text((960,655),'arc-compute-rate.vercel.app',font=small,fill=(168,188,210),anchor='mm')
   last=src;last_focus=focus
  im=base.copy();draw=ImageDraw.Draw(im)
  text=next((x for s,e,x in cues if s<=t<e),'')
  if text:draw.text((960,1030),text,font=font,fill='white',anchor='mm')
  proc.stdin.write(im.tobytes())
 proc.stdin.close();assert proc.wait()==0
 clips.append(out);offset+=length;print('Rendered',n,flush=True)
assert offset<120,offset
(D/'vo/timeline.json').write_text(json.dumps({'dur':offset,'vo':voices,'cues':cuesall,'scenes':scenes},indent=2))
(D/'contract-cut.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(c["s"])} --> {stamp(c["e"])}\n{c["text"]}' for i,c in enumerate(cuesall)))
(W/'concat.txt').write_text(''.join(f"file '{p}'\n" for p in clips));ff(['-f','concat','-safe','0','-i',W/'concat.txt','-c','copy',W/'silent.mp4'])
shutil.copy(P/'homepage-cut/music.mjs',D/'music.mjs');subprocess.run(['node',str(D/'music.mjs'),str(W/'music.wav')],check=True)
inputs=sum((['-i',v['file']] for v in voices),[]);parts=';'.join(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={round(v["start"]*1000)}|{round(v["start"]*1000)}[v{i}]' for i,v in enumerate(voices));streams=''.join(f'[v{i}]' for i in range(len(voices)))
ff(inputs+['-filter_complex',parts+f';{streams}amix=inputs={len(voices)}:normalize=0,apad=whole_dur={offset}[v]','-map','[v]','-t',offset,W/'voice.wav'])
ff(['-i',W/'music.wav','-i',W/'voice.wav','-filter_complex','[0:a]aresample=48000,loudnorm=I=-19:TP=-2:LRA=8,equalizer=f=1800:t=o:w=2:g=-3,volume=0.45[m];[1:a]asplit=2[v1][v2];[m][v1]sidechaincompress=threshold=0.025:ratio=3:attack=15:release=180[md];[md][v2]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=10[a]','-map','[a]','-ar','48000','-t',offset,W/'mix.wav'])
ff(['-i',W/'silent.mp4','-i',W/'mix.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-t',offset,'-movflags','+faststart',D/'acr-aomi-contract.mp4'])
(D/'verification.json').write_text(json.dumps({'duration_s':offset,'canvas':[1920,1080],'pixel_aspect_ratio':'1:1','display_aspect_ratio':'16:9','scaling':'uniform contain, never stretch','max_scale_rounding_error':max(x['scale_error'] for x in scalings.values()),'logo':'official square Aomi mark rendered white','live_research_tools':['acr_check_bill'],'treasury_execution':'Not demonstrated. Source walkthrough explicitly labeled; deployment acceptance pending.','github_capture':'Actual Chrome GitHub pages and screen recording','scenes':scenes},indent=2));print('DONE',offset,flush=True)
