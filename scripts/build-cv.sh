#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CV_SOURCE="$PROJECT_ROOT/cv/kehan-pang-cv.tex"
PUBLIC_DIR="$PROJECT_ROOT/docs/.vuepress/public"
CV_TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$CV_TMP_DIR"
}
trap cleanup EXIT

mkdir -p "$PUBLIC_DIR"
latexmk \
  -xelatex \
  -interaction=nonstopmode \
  -halt-on-error \
  -file-line-error \
  -outdir="$CV_TMP_DIR" \
  "$CV_SOURCE" >/dev/null

CV_LOG="$CV_TMP_DIR/kehan-pang-cv.log"
if grep -E 'Overfull \\hbox|Missing character|undefined references|undefined citations' "$CV_LOG"; then
  echo "CV compilation produced a layout or glyph warning." >&2
  exit 1
fi

CV_PAGES="$(pdfinfo "$CV_TMP_DIR/kehan-pang-cv.pdf" | awk '/^Pages:/ { print $2 }')"
if [[ "$CV_PAGES" != "2" ]]; then
  echo "Expected a two-page CV, generated $CV_PAGES page(s)." >&2
  exit 1
fi

install -m 0644 "$CV_TMP_DIR/kehan-pang-cv.pdf" "$PUBLIC_DIR/kehan-pang-cv.pdf"
echo "CV generated: $PUBLIC_DIR/kehan-pang-cv.pdf ($CV_PAGES pages)"
