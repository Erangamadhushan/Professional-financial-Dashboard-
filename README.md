# Next.js App Router Backend (TypeScript + Mongoose)

## Setup
1. Copy `.env.local.example` to `.env.local` and fill values.
2. `npm install`
3. `npm run dev`

## API
- `POST /api/auth?action=signup` - signup
- `POST /api/auth?action=login` - login (returns token)
- `GET /api/users` - get current user (Authorization: Bearer <token>)
- `GET /api/products` - list products
- `POST /api/products` - create product (protected)
