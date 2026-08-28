# Awaaz Desk

Static GitHub Pages export of the Awaaz Desk pilot landing page.

## Backend

The backend lives in `backend/`. It provides:

- `POST /api/leads` for pilot requests, AI intake summaries, and owner email notifications.
- `POST /api/scripts` for starter AI receptionist scripts.
- `GET /health` for deployment checks.

GitHub Pages cannot run backend code, so deploy `backend/` separately to a Node host such as Render, Railway, Fly.io, or Vercel Functions. After deployment, set the frontend API URL in `docs/assets/config.js`:

```js
window.AWAAZ_API_URL = "https://your-backend.example.com";
```

You can also test without committing a backend URL by visiting the page with `?api=https://your-backend.example.com`.

The intended public email identity is `hello@awaazdesk.in`. See `EMAIL_SETUP.md` for the mailbox and DNS checklist.

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
