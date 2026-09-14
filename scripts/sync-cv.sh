#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_ROOT="$(cd "$PROJECT_ROOT/.." && pwd)"
ENGLISH_CV_SOURCE="$WORKSPACE_ROOT/cv.pdf"
CHINESE_CV_SOURCE="$WORKSPACE_ROOT/简历.pdf"
DIST_DIR="$PROJECT_ROOT/docs/.vuepress/dist"
ENGLISH_CV_TARGET="$DIST_DIR/cv.pdf"
CHINESE_CV_TARGET="$DIST_DIR/简历.pdf"

for source in "$ENGLISH_CV_SOURCE" "$CHINESE_CV_SOURCE"; do
  if [[ ! -f "$source" ]]; then
    echo "CV source is missing: $source" >&2
    exit 1
  fi
done

if [[ ! -f "$DIST_DIR/index.html" ]]; then
  echo "Build output is missing: $DIST_DIR/index.html" >&2
  exit 1
fi

install -m 0644 "$CHINESE_CV_SOURCE" "$CHINESE_CV_TARGET"
install -m 0644 "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_TARGET"

cmp -s "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_TARGET"
cmp -s "$CHINESE_CV_SOURCE" "$CHINESE_CV_TARGET"

echo "English CV copied unchanged: $ENGLISH_CV_TARGET"
echo "Chinese CV copied unchanged: $CHINESE_CV_TARGET"
sha256sum "$ENGLISH_CV_SOURCE" "$ENGLISH_CV_TARGET" "$CHINESE_CV_SOURCE" "$CHINESE_CV_TARGET"
