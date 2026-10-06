#!/usr/bin/env bash
# Tiles up to 4 stills into one 1920×1080 review sheet (2×2), so a whole scene can be checked in one image.
#   contact-sheet.sh <out.jpg> <still1.jpg> [still2.jpg …]
set -euo pipefail
out=$1; shift
n=$#; [[ $n -ge 1 && $n -le 4 ]] || { echo "give 1–4 stills" >&2; exit 2; }
ins=(); for f in "$@"; do ins+=(-i "$f"); done
for ((k = n; k < 4; k++)); do ins+=(-f lavfi -i "color=c=0xfcf7f6:s=1920x1080:d=1"); done
ffmpeg -y -hide_banner -loglevel error "${ins[@]}" -filter_complex \
  "[0]scale=960:540[a];[1]scale=960:540[b];[2]scale=960:540[c];[3]scale=960:540[d];[a][b][c][d]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0" \
  -frames:v 1 "$out"
echo "$out"
