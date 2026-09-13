#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$PROJECT_ROOT/docs/.vuepress/dist"
PAGES_DIR="$PROJECT_ROOT/../vueDist/dist"

if [[ ! -f "$BUILD_DIR/index.html" ]]; then
  echo "Build output is missing. Run npm run build first." >&2
  exit 1
fi

if [[ ! -d "$PAGES_DIR/.git" ]]; then
  echo "Refusing to sync: $PAGES_DIR is not the expected Pages repository." >&2
  exit 1
fi

rsync -a --delete --exclude='.git/' --filter='protect /.git/' "$BUILD_DIR/" "$PAGES_DIR/"

if [[ ! -d "$PAGES_DIR/.git" ]]; then
  echo "Pages repository metadata was not preserved." >&2
  exit 1
fi

echo "Pages working tree synchronized without commit or push: $PAGES_DIR"
