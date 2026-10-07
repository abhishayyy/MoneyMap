# MoneyMap

A multi-user personal expense tracker with separate frontend, API, authentication, and database layers.

## Architecture

- `frontend/` — React + Vite UI and CSS
- `backend/` — Express API, JWT authentication, validation
- `backend/prisma/` — SQLite schema and database access (zero-config local dev)
- Each user only sees their own expenses

## Run locally

1. Install Node.js 20+.
2. Ensure `backend/.env` has `DATABASE_URL="file:./dev.db"` and `JWT_SECRET`.
3. Run `npm run install:all` from this folder.
4. Run `npm run dev`.
5. Open `http://localhost:5173`.

## Production

Deploy the frontend and backend separately (or behind one domain), and use a managed PostgreSQL database. Set the production environment variables from the examples.
