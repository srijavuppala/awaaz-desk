# Awaaz Desk

Static GitHub Pages export of the Awaaz Desk pilot landing page.

## Deploy to GitHub Pages

This repo is set up to publish from the `docs/` folder on the `main` branch.

After authenticating GitHub CLI, run:

```sh
./deploy-github-pages.sh
```

If the repo already exists, use:

```sh
git remote add origin git@github.com:srijavuppala/awaaz-desk.git
git push -u origin main
gh api repos/srijavuppala/awaaz-desk/pages --method POST --input github-pages-source.json
```

Once Pages finishes publishing, the site will be available at:

https://srijavuppala.github.io/awaaz-desk/
