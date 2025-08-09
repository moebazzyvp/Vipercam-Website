# Deploying to IONOS Deploy Now (Next.js SSR + API)

## Build/Run settings
- Node version: 18 (repo contains `.nvmrc`)
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Framework: Next.js (auto-detected)

## Environment variables (Project → Settings → Environment)
Set the following as needed:
- `NODE_ENV=production`
- `STAFF_EMAIL`
- `STAFF_PHONE`
- `TWILIO_ACCOUNT_SID` (optional)
- `TWILIO_AUTH_TOKEN` (optional)
- `TWILIO_PHONE_NUMBER` (optional)
- `SENDGRID_API_KEY` or provider-specific email keys (optional)

## Steps
1. Push this repo to GitHub/GitLab/Bitbucket.
2. IONOS → Deploy Now → New Project → Connect repository.
3. Confirm:
   - Build: `npm ci && npm run build`
   - Start: `npm start`
   - Node: 18
4. Add environment variables and Deploy.
5. Connect your domain to the project (Deploy Now → Domains).

## Notes
- `next.config.mjs` sets `output: 'standalone'` for smaller server bundles.
- API routes are available under `/api/*` after deployment.
- If you change Node version, update `.nvmrc` accordingly.