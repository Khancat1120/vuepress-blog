#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

npm run build
npm run validate
npm run sync:dist

echo "Build and local Pages sync complete. Review both repositories before committing or pushing."
