# Afrovibes

Vite + React + Tailwind site, content-managed with Decap CMS, deployed on Netlify.

## Project structure

```
content/            ← All editable content lives here as JSON. Decap CMS reads/writes these files.
  events/*.json      one file per event
  products/*.json     one file per merch item
  team/*.json          one file per team member
  site.json             sitewide settings (WhatsApp number, socials, email)
public/admin/        ← Decap CMS admin panel (config.yml + index.html)
src/                 ← React app
netlify.toml         ← Build + SPA redirect config for Netlify
```

Content is imported at **build time** (via `import.meta.glob` in `src/data/content.js`), so
whenever Decap saves a change to a JSON file and pushes it to GitHub, Netlify automatically
rebuilds the site and the change goes live — no manual redeploy needed.

## 1. Local setup

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
```

## 2. Push to GitHub

You don't have a repo yet, so:

1. Go to github.com → **New repository** → name it `afrovibes` (private or public, your call) →
   create it **empty** (no README/gitignore, since this project already has them).
2. In this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/afrovibes.git
   git push -u origin main
   ```

## 3. Connect to Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub** → pick the `afrovibes` repo.
2. Build settings should auto-detect from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy. You'll get a `*.netlify.app` URL — swap in your custom domain later under
   **Site configuration → Domain management**.

## 4. Turn on Decap CMS (Netlify Identity + Git Gateway)

Decap needs a way to log editors in and let them commit to GitHub on your behalf. The simplest
option (no separate OAuth app to set up) is Netlify Identity + Git Gateway:

1. In your Netlify site dashboard: **Site configuration → Identity → Enable Identity**.
2. Under Identity settings, set **Registration** to "Invite only" (so random people can't sign
   themselves up).
3. Still under Identity: **Services → Git Gateway → Enable Git Gateway**. This lets Netlify commit
   to your repo on behalf of logged-in Identity users without you creating a GitHub OAuth app.
4. Go to **Identity → Invite users**, and invite yourself (and anyone else who should be able to
   edit content) by email. You'll get an email to set a password.
5. Visit `https://<your-site>.netlify.app/admin` and log in. You should see the Events, Merch,
   Team, and Site Settings collections, matching the folders in `content/`.

> If you'd rather authenticate straight against GitHub (matching however GB Studios is set up)
> instead of Netlify Identity, that just means changing `backend.name` in
> `public/admin/config.yml` from `git-gateway` to `github`, adding your repo under `backend.repo`,
> and registering a GitHub OAuth app pointed at Netlify's OAuth provider. Happy to walk through
> that instead if that's the setup you're already using elsewhere.

## 5. A note on images

Right now all images are hotlinked Unsplash placeholder photos. When you're ready to swap in
real photography, either:
- Paste a new external image URL into the relevant field in Decap (fields are plain text/URL,
  not an upload widget, so any hosted image URL works), or
- Ask me to switch the image fields to Decap's upload widget, which will store uploaded files in
  `public/uploads/` and commit them straight to the repo.

## 6. Known gotcha (learned the hard way on GB Studios)

Every collection in `public/admin/config.yml` explicitly sets `extension: "json"` and
`format: "json"`. Without those two lines, Decap defaults to saving new entries as `.md`
files, which the site's JSON-based content loader won't pick up — entries would silently
not appear anywhere. If you ever add a new collection, make sure to set both.
