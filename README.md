# Manga/Manhwa Hub

A full-stack reading platform for manga and manhwa with authentication, favorites, reading progress, and a catalog UI.

## Stack
- Frontend: React + Vite + React Router
- Backend: Node.js + Express + SQLite + JWT
- Auth: Register, login, profile, protected routes
- Features: catalog, search, chapter reader, favorites, reading progress

## Project structure
- `backend/` — Express API and SQLite database
- `frontend/` — React app

## Quick start

1. Install dependencies:
   ```bash
   npm run install:all
   ```

2. Create env files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. Start the app:
   ```bash
   npm run dev
   ```

4. Open the frontend:
   - http://localhost:5173

5. API base URL:
   - http://localhost:3001/api

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/profile`
- `GET /api/catalog`
- `GET /api/catalog/:id`
- `GET /api/favorites`
- `POST /api/favorites/:id`
- `GET /api/progress`
- `POST /api/progress/:id`

## Production notes
- Use a real production database such as PostgreSQL or MySQL.
- Add real image hosting and CDN for covers.
- Add rate limiting, security headers, and validation for production deployment.
