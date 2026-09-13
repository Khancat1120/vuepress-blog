#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CV_SOURCE="$PROJECT_ROOT/cv/kehan-pang-cv.tex"
CHINESE_CV_SOURCE="$PROJECT_ROOT/../庞可涵的个人简历-202608.pdf"
PUBLIC_DIR="$PROJECT_ROOT/docs/.vuepress/public"
CV_PUBLIC_DIR="$PUBLIC_DIR/cv"
CV_TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$CV_TMP_DIR"
}
trap cleanup EXIT

if [[ ! -f "$CHINESE_CV_SOURCE" ]]; then
  echo "Chinese CV source is missing: $CHINESE_CV_SOURCE" >&2
  exit 1
fi

mkdir -p "$CV_PUBLIC_DIR"
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

install -m 0644 "$CV_TMP_DIR/kehan-pang-cv.pdf" "$CV_PUBLIC_DIR/kehan-pang-cv-en.pdf"
install -m 0644 "$CV_TMP_DIR/kehan-pang-cv.pdf" "$PUBLIC_DIR/kehan-pang-cv.pdf"
install -m 0644 "$CHINESE_CV_SOURCE" "$CV_PUBLIC_DIR/kehan-pang-cv-zh.pdf"

ZH_CV_PAGES="$(pdfinfo "$CV_PUBLIC_DIR/kehan-pang-cv-zh.pdf" | awk '/^Pages:/ { print $2 }')"
if [[ "$ZH_CV_PAGES" != "2" ]]; then
  echo "Expected the selected Chinese CV to have two pages, found $ZH_CV_PAGES." >&2
  exit 1
fi

echo "English CV generated: $CV_PUBLIC_DIR/kehan-pang-cv-en.pdf ($CV_PAGES pages)"
echo "English CV alias generated: $PUBLIC_DIR/kehan-pang-cv.pdf"
echo "Chinese CV copied: $CV_PUBLIC_DIR/kehan-pang-cv-zh.pdf ($ZH_CV_PAGES pages)"
