# Go Business Referral Dashboard

A React + Vite dashboard for viewing referral metrics, service summary data, and referral details. The app uses JWT cookie authentication, protected routes, and data from a backend API.

## Features

- Login page with email and password authentication
- Protected dashboard and referral detail routes
- Overview cards for key referral metrics
- Service summary section with copyable referral link and code
- Referrals table for tracking referral activity
- 404 page for unmatched routes

## Tech Stack

- React 19
- React Router DOM
- js-cookie for JWT storage
- Vite

## Project Structure

- `src/pages/Login` handles sign-in
- `src/pages/Dashboard` renders the main referral dashboard
- `src/pages/ReferralDetails` shows details for a single referral
- `src/components/ProtectedRoute` guards authenticated pages
- `src/components/Navbar`, `Footer`, and `ReferralsTable` provide shared UI

## Routes

- `/login` - sign-in page
- `/` - protected dashboard
- `/referral/:id` - protected referral details page
- `*` - not found page

## API

The app currently calls these backend endpoints:

- `POST /api/auth/signin` for login
- `GET /api/referrals` for dashboard data

On successful login, the app stores the returned JWT in a cookie named `jwt_token`.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

5. Run linting:

```bash
npm run lint
```

## Notes

- The dashboard reads the JWT from `jwt_token` and includes it in the `Authorization` header.
- The app is configured for Vercel deployment through `vercel.json`.
