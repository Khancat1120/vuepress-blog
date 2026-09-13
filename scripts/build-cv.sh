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
xelatex -interaction=nonstopmode -halt-on-error -output-directory="$CV_TMP_DIR" "$CV_SOURCE" >/dev/null
install -m 0644 "$CV_TMP_DIR/kehan-pang-cv.pdf" "$PUBLIC_DIR/kehan-pang-cv.pdf"
echo "CV generated: $PUBLIC_DIR/kehan-pang-cv.pdf"
