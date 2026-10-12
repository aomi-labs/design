#!/bin/zsh
# Local neural-voice build (Kokoro, no API key) — an alternative to finalize.sh.
# Sets up a venv, caches the model, voices every step, then composes and encodes.
#   ./kokoro-finalize.sh            (voice af_heart)
#   KOKORO_VOICE=am_michael ./kokoro-finalize.sh
set -e
cd "${0:A:h}/../../.."                        # repo root
V=deliverables/videos/arc-fuzzer
CACHE="${KOKORO_CACHE:-$HOME/.cache/kokoro-tts}"; mkdir -p "$CACHE"
PV="$CACHE/venv/bin"
[ -x "$PV/python" ] || { python3 -m venv "$CACHE/venv"; "$PV/pip" install -q kokoro-onnx soundfile; }
[ -f "$CACHE/kokoro.onnx" ] || curl -fsSL -o "$CACHE/kokoro.onnx" https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
[ -f "$CACHE/voices.bin" ] || curl -fsSL -o "$CACHE/voices.bin" https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
# espeak-ng data: this wheel hardcodes a bad path; link the bundled data where it looks.
DATA=$("$PV/python" -c "import espeakng_loader;print(espeakng_loader.get_data_path())")
LD="$("$PV/python" -c "import sys,os;print(os.path.join(sys.prefix,'lib','python%d.%d'%sys.version_info[:2]))")"
for f in "$DATA"/*; do ln -sf "$f" "$LD/"; done
node -e "import('./$V/walkthrough.mjs').then(m=>console.log(JSON.stringify(m.STEPS.filter(s=>s.say).map(s=>({id:s.id,say:s.say})))))" > "$CACHE/lines.json"
( cd "$CACHE" && "$PV/python" "$OLDPWD/skills/eleven-announcer/scripts/kokoro_tts.py" "$CACHE/lines.json" "$OLDPWD/$V/vo" )
node skills/eleven-announcer/scripts/compose.mjs $V
FR=$(mktemp -d)/frames
node skills/slide-to-video/scripts/render.mjs $V/compositor.html --out $FR
node skills/slide-to-video/scripts/finish.mjs $V $FR
echo "done: $V/arc-fuzzer.mp4 (neural voice: ${KOKORO_VOICE:-af_heart})"
