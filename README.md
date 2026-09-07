# Company Website Scaffold

Two separate projects: `backend/` (Node.js + Express + PostgreSQL) and `frontend/` (React + Vite).

## Backend setup

```
cd backend
npm install
cp .env.example .env
```

1. Create a PostgreSQL database (Supabase or Render both work) and put the connection string in `DATABASE_URL`.
2. Generate an admin password hash:
   ```
   node scripts/hash-password.js "yourChosenPassword"
   ```
   Paste the printed hash into `ADMIN_PASSWORD_HASH` in `.env`, and set `ADMIN_EMAIL` to your admin login email.
3. Set `JWT_SECRET` to any long random string.
4. Run the migration to create the tables:
   ```
   npm run migrate
   ```
5. Start the server:
   ```
   npm run dev
   ```
   API runs on `http://localhost:4000`.

## Frontend setup

```
cd frontend
npm install
cp .env.example .env
npm run dev
```

Site runs on `http://localhost:5173`.

- `/` — public updates feed
- `/apply` — internship application form
- `/admin/login` — admin login
- `/admin` — admin dashboard (post updates, view applications) — requires login

## Deploying

- **Frontend**: deploy `frontend/` to Vercel or Netlify. Set `VITE_API_URL` to your deployed backend URL.
- **Backend**: deploy `backend/` to Render (or as Vercel serverless functions with some restructuring). Set the same environment variables as in `.env.example`.
- **Database**: Supabase or Render Postgres both work — just point `DATABASE_URL` at it and run `npm run migrate` once against the production database.

## Notes

- Admin auth is a single hardcoded admin account (email + bcrypt password hash in env vars) — no user table, no signup flow, on purpose since there's only one admin.
- The `track` field in applications uses a Postgres enum with three fixed values matching the three internship tracks.
- No file/resume uploads — application form is text fields only, per the spec.
