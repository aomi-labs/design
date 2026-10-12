import json, subprocess, sys, os, wave
from pathlib import Path
import soundfile as sf
from kokoro_onnx import Kokoro

lines = json.load(open(sys.argv[1]))
vo = Path(sys.argv[2]); vo.mkdir(parents=True, exist_ok=True)
voice = os.environ.get("KOKORO_VOICE", "af_heart")
speed = float(os.environ.get("KOKORO_SPEED", "1.0"))
k = Kokoro("kokoro.onnx", "voices.bin")
for L in lines:
    base = vo / f"step{L['id']:02d}"
    wavp = str(base) + ".wav"
    s, sr = k.create(L["say"], voice=voice, speed=speed, lang="en-us")
    sf.write(wavp, s, sr)
    mp3 = str(base) + ".mp3"
    subprocess.run(["ffmpeg","-y","-loglevel","error","-i",wavp,"-ar","44100","-ac","1","-b:a","96k",mp3], check=True)
    os.remove(wavp)
    dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",mp3]).decode().strip())
    chars = list(L["say"]); per = (dur - 0.15)/len(chars)
    json.dump({"characters":chars,
               "character_start_times_seconds":[0.05+i*per for i in range(len(chars))],
               "character_end_times_seconds":[0.05+(i+1)*per for i in range(len(chars))]},
              open(str(base)+".json","w"))
    print(f"step {L['id']} voiced (kokoro {voice}) {dur:.1f}s")
