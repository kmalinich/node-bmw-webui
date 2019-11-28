#!/usr/bin/env bash

# Clean up
mapfile -t ARRAY_OLD_FILES < <(find . -iname '*.br' -o -iname '*.gz' -o -iname '*.html')
rm -f "${ARRAY_OLD_FILES[@]}"

echo "Complete"
