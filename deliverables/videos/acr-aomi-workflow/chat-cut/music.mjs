#!/usr/bin/env node
// Original 124 BPM electronic instrumental: drums, syncopated bass, bright synths.
// Synthesized from oscillators/noise; no samples or third-party recordings.
import {readFileSync,writeFileSync} from 'node:fs';
const {dur:DUR}=JSON.parse(readFileSync(new URL('./vo/timeline.json',import.meta.url),'utf8'));
const SR=44100,N=Math.round(DUR*SR),L=new Float32Array(N),R=new Float32Array(N);
const B=60/124,bar=4*B,tau=2*Math.PI,hz=m=>440*2**((m-69)/12);
let seed=319;const noise=()=>((seed=(seed*16807)%2147483647)/2147483647)*2-1;
const chords=[[62,66,69,73],[59,62,66,69],[55,59,62,66],[57,61,64,69]],bass=[38,35,31,33];
const add=(start,len,fn,pan=.5,g=1)=>{const n0=Math.round(start*SR);for(let i=0;i<len*SR&&n0+i<N;i++){if(n0+i<0)continue;const v=fn(i/SR)*g;L[n0+i]+=v*Math.sqrt(1-pan);R[n0+i]+=v*Math.sqrt(pan)}};
const synth=(start,note,len,amp,pan=.5)=>{const f=hz(note);const tone=t=>{const env=Math.min(1,t/.008)*Math.exp(-t/.19)*Math.min(1,(len-t)/.04);return env*(Math.sin(tau*f*t)+.30*Math.sin(tau*f*2*t)+.12*Math.sin(tau*f*3*t))};add(start,len,tone,pan,amp);add(start+B*.75,len,tone,1-pan,amp*.14)};
for(let k=0;k*B<DUR;k++){
 const t=k*B,beat=k%4,bi=Math.floor(k/4),ci=Math.floor(bi/2)%4;
 const breakdown=t>=47&&t<66, intro=t<2.5, ending=t>DUR-4;
 const energy=breakdown?.55:intro?.75:1;
 // Tuned kick, four on the floor; half-time under the contract explanation.
 if(!breakdown||beat%2===0)add(t,.42,x=>{const phase=tau*(48*x+110*.023*(1-Math.exp(-x/.023)));return Math.sin(phase)*Math.exp(-x/.11)*Math.min(1,x/.001)+noise()*.045*Math.exp(-x/.007)},.5,.75*energy);
 if(beat===1||beat===3)add(t,.20,x=>{const n=noise(),env=Math.exp(-x/.045)+.35*Math.exp(-Math.abs(x-.013)/.012)+.2*Math.exp(-Math.abs(x-.025)/.012);return (n*.67+Math.sin(tau*190*x)*.15)*env*Math.min(1,x/.001)},.5,.21*energy);
 for(const off of [0,.5]){let prev=0;add(t+off*B,.10,x=>{const n=noise(),v=n-prev;prev=n;return v*Math.exp(-x/(off?.035:.014))*Math.min(1,x/.001)},off?.65:.35,(off?.045:.025)*energy)}
 if(!intro&&!ending){
  for(const off of [.5,.875])add(t+off*B,.20,x=>{const f=hz(bass[ci]),e=Math.min(1,x/.006)*Math.exp(-x/.11)*Math.min(1,(.20-x)/.02);return e*(Math.sin(tau*f*x)+.25*Math.sin(tau*f*2*x)+.1*Math.sin(tau*f*3*x))},.5,.27*energy);
 }
 // Wide syncopated major-seventh stabs, leaving room for narration.
 if(beat===0||beat===2){const off=beat===0?.5:.75;chords[ci].forEach((m,j)=>synth(t+off*B,m,.65,.046*energy,.2+j*.2));}
 if(!breakdown&&t>6&&bi%4>=2){const pattern=[0,2,1,3];synth(t+B*.5,chords[ci][pattern[beat]]+12,.28,.045,beat%2?.72:.28);}
 // Short rising texture into each eight-bar phrase.
 if(beat===3&&bi%8===7&&!ending)add(t+B*.5,B*.5,x=>noise()*.025*(x/(B*.5))**2,.5);
}
// A short resolved chord on the outro.
chords[0].forEach((m,j)=>synth(DUR-3.8,m,1.2,.09,.2+j*.2));
let peak=0;for(let i=0;i<N;i++){const t=i/SR,fade=Math.min(1,t/.04)*Math.min(1,(DUR-t)/1.4);L[i]=Math.tanh(L[i]*1.15)*fade;R[i]=Math.tanh(R[i]*1.15)*fade;peak=Math.max(peak,Math.abs(L[i]),Math.abs(R[i]));}
const g=.92/peak,buf=Buffer.alloc(44+N*4);buf.write('RIFF');buf.writeUInt32LE(36+N*4,4);buf.write('WAVEfmt ',8);buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(2,22);buf.writeUInt32LE(SR,24);buf.writeUInt32LE(SR*4,28);buf.writeUInt16LE(4,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(N*4,40);for(let i=0;i<N;i++){buf.writeInt16LE(Math.round(L[i]*g*32767),44+i*4);buf.writeInt16LE(Math.round(R[i]*g*32767),46+i*4)}writeFileSync(process.argv[2]||'music.wav',buf);console.log(`Vibrant electronic score: ${DUR}s at 124 BPM.`);
