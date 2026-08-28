#!/usr/bin/env sh
set -eu

repo_name="${1:-awaaz-desk}"
owner="${2:-srijavuppala}"

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Run: gh auth login -h github.com"
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  gh repo create "$repo_name" --public --source . --remote origin --push
else
  git push -u origin main
fi

gh api "repos/$owner/$repo_name/pages" --method POST --input github-pages-source.json \
  || gh api "repos/$owner/$repo_name/pages" --method PUT --input github-pages-source.json

echo "GitHub Pages requested for https://$owner.github.io/$repo_name/"
