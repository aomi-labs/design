#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: encode-video.sh <frames-directory> <output.mp4> [fps]" >&2
  exit 2
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. On macOS, install it with: brew install ffmpeg" >&2
  exit 1
fi

frames_dir=$1
output=$2
fps=${3:-30}

if [[ ! -d "$frames_dir" ]]; then
  echo "Frames directory not found: $frames_dir" >&2
  exit 1
fi

mkdir -p "$(dirname "$output")"

ffmpeg -y \
  -framerate "$fps" \
  -i "$frames_dir/frame-%06d.png" \
  -vf "scale=ceil(iw/2)*2:ceil(ih/2)*2" \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$output"

echo "Created $output"
