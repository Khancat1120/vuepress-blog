#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENGLISH_CV_SOURCE="$PROJECT_ROOT/../KehanPang's Resume-202608.pdf"
CHINESE_CV_SOURCE="$PROJECT_ROOT/../庞可涵的个人简历-202608.pdf"
PUBLIC_DIR="$PROJECT_ROOT/docs/.vuepress/public"
CV_PUBLIC_DIR="$PUBLIC_DIR/cv"
ENGLISH_CV_TARGET="$CV_PUBLIC_DIR/kehan-pang-cv-en.pdf"
CHINESE_CV_TARGET="$CV_PUBLIC_DIR/kehan-pang-cv-zh.pdf"
ENGLISH_CV_ALIAS="$PUBLIC_DIR/kehan-pang-cv.pdf"

for source in "$ENGLISH_CV_SOURCE" "$CHINESE_CV_SOURCE"; do
  if [[ ! -f "$source" ]]; then
    echo "CV source is missing: $source" >&2
    exit 1
  fi
done

mkdir -p "$CV_PUBLIC_DIR"
install -m 0644 "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_TARGET"
install -m 0644 "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_ALIAS"
install -m 0644 "$CHINESE_CV_SOURCE" "$CHINESE_CV_TARGET"

cmp -s "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_TARGET"
cmp -s "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_ALIAS"
cmp -s "$CHINESE_CV_SOURCE" "$CHINESE_CV_TARGET"

echo "English CV copied unchanged: $ENGLISH_CV_TARGET"
echo "English CV alias copied unchanged: $ENGLISH_CV_ALIAS"
echo "Chinese CV copied unchanged: $CHINESE_CV_TARGET"
sha256sum "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_TARGET" "$ENGLISH_CV_ALIAS" "$CHINESE_CV_SOURCE" "$CHINESE_CV_TARGET"
