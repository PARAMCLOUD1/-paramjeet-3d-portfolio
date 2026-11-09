# PARAMJEET STUDIO deployment

The frontend is prepared for Vercel and the Flask API for Render. Configuration
files do not create hosting resources or prove a deployment succeeded.

## Vercel frontend

Import `https://github.com/PARAMCLOUD1/-paramjeet-3d-portfolio` with:

- Branch: `main`
- Root Directory: `frontend`
- Framework: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

`frontend/vercel.json` records these build settings. Local images, icons, and
models are served from Vite's public directory. No frontend route fallback is
needed because section navigation uses URL fragments.

After the backend is live, `VITE_API_BASE_URL` can be set to its actual HTTPS
origin, without a trailing slash. Vite embeds this value at build time, so rebuild
after changing it. Currently the only API consumer is the development-only
health indicator; the public portfolio does not depend on an API request.

## Render backend

Create a Blueprint from the same repository using the root `render.yaml` file.
It declares a free Python web service in Singapore with:

- Root Directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 4`
- Health check path: `/api/health`

Supply `FRONTEND_ORIGINS` when prompted. Use the actual Vercel production HTTPS
origin. Additional approved origins can be comma-separated; avoid a wildcard.
The blueprint does not contain account credentials or guessed deployment URLs.

The API implements a health endpoint only. Contact links open email, phone,
GitHub, and LinkedIn; this deployment does not add contact-message storage or
delivery.

## Acceptance after publishing

1. Check the Vercel URL returns HTTP 200 and the page title is PARAMJEET STUDIO.
2. Check the portrait and local assets load, including the optional 3D office.
3. Check all six panels, entrance controls, and the four contact links.
4. Check narrow-screen navigation, stacked contact content, and reduced motion.
5. Check the actual Render URL at `/api/health` returns `status: ok`.
6. Check the API's CORS response allows the actual Vercel origin.

Account authentication and live URLs remain necessary to perform these checks.
