# UCL Campus Hub — DevDash '26

MERN-stack project scaffold: one place for UCL students to access campus
announcements, events, societies, lost & found, room booking, academic
support and an AI assistant — replacing the current mix of disconnected
channels (WhatsApp groups, notice boards, word of mouth).

## Structure

- `backend/` — Express + MongoDB API (see backend/README.md)
- `frontend/` — React + Vite client (see frontend/README.md)
- `FEATURES_MAP.md` — every business requirement (BR1-BR33) mapped to the
  exact files that implement it

## Getting started

1. `cd backend && npm install && cp .env.example .env`
2. `cd frontend && npm install && cp .env.example .env`
3. Run backend: `npm run dev` (inside backend/)
4. Run frontend: `npm run dev` (inside frontend/)

This is a structure only — every file currently holds a one-line comment
describing what belongs there. Fill in the logic during the build phase.
