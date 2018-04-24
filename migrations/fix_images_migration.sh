#!/usr/local/bin/zsh
autoload -U zmv
zmodload zsh/mapfile

for filepath in ../src/posts/[0-9]*/**/*.md; do 
  echo $filepath

  # Fix the image paths
  gsed -E -i 's/src=(?:"|')\/images(.*)(?:"|') /src="\/static\/images\/\1 /g' $filepath
done
