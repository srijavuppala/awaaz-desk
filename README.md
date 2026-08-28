# Awaaz Desk

Static GitHub Pages export of the Awaaz Desk pilot landing page.

## Deploy to GitHub Pages

This repo is set up to publish from the `docs/` folder on the `main` branch.

After authenticating GitHub CLI, run:

```sh
gh repo create awaaz-desk --public --source . --remote origin --push
gh api repos/:owner/awaaz-desk/pages --method POST --input github-pages-source.json
```

If the repo already exists, use:

```sh
git remote add origin git@github.com:srijavuppala/awaaz-desk.git
git push -u origin main
gh api repos/srijavuppala/awaaz-desk/pages --method POST --input github-pages-source.json
```
