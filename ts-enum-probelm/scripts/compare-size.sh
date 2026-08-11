#!/usr/bin/env zsh
set -e
cd "$(dirname "$0")/.."

if [[ -n "$1" ]]; then
  src="src/$1"
else
  files=(src/*.ts(N))
  select f in $files; do
    src=$f
    break
  done
fi

name=$(basename "$src" .ts)
dist="dist/${name}.js"

before=$(wc -c < "$src" | tr -d ' ')
pnpm exec esbuild "$src" --bundle --platform=node --format=esm --outfile="$dist" > /dev/null
after=$(wc -c < "$dist" | tr -d ' ')

echo "${src}:  ${before} bytes"
echo "${dist}: ${after} bytes"
echo "diff:          $((after - before)) bytes"
