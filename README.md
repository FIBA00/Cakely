# Cakely

Cakely is a responsive, mobile-first cake-ordering Progressive Web App frontend. It provides a complete customer journey from browsing a visual catalogue to guided custom-cake creation, cart review, checkout, order confirmation, tracking, account management, and a mock-backed admin foundation.

## Technical approach

The frontend uses **React 19**, JavaScript/JSX, Vite, Tailwind CSS 4, React Router 7, TanStack Query, Zustand, React Hook Form, Zod, Lucide, Motion, Vitest, Playwright, and `vite-plugin-pwa`. Application state that is truly local, namely cart contents, favorites, and mock user session, persists in browser storage. Mock server data remains behind service modules so a FastAPI backend can replace it without rewriting page components.

| Area              | Implementation                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| Public experience | Home, shop filters/search, cake details, custom cake, about, contact, branded not-found           |
| Ordering          | Persistent cart, validated checkout, manual payment options, confirmation and tracking timeline   |
| Customer account  | Profile, order history, saved cakes, protected routes                                             |
| Operations        | Admin overview, cake availability control, and order status foundation                            |
| Resilience        | Loading, empty, error, offline, and image fallback states                                         |
| PWA               | Manifest, standalone display, service worker, static precache, image runtime cache, update prompt |

## Getting started

```bash
pnpm install
pnpm dev
```

Build a production bundle with `pnpm build`; preview it with `pnpm preview`. Run unit tests with `pnpm test`, lint with `pnpm lint`, and run the browser flow with `pnpm test:e2e` after Playwright browsers are installed.

## Environment

The optional `VITE_API_URL` value selects a real API base URL. When unset, the service layer uses the local mock implementation. Do not put private server credentials or API secrets in the frontend environment.

## API integration contract

The client’s services map cleanly to a future FastAPI API. Expected endpoint families are `POST /auth/login`, `POST /auth/register`, `POST /auth/logout`, `GET /auth/me`, `GET /cakes`, `GET /cakes/:id`, `POST /cakes/custom`, `GET /orders`, `GET /orders/:id`, `POST /orders`, `PATCH /orders/:id/status`, and `PATCH /users/me`. Cake objects should provide id, name, category, flavor, price, availability, images, sizes, ingredients, and allergens. Order objects should provide id, status, customer, items, fulfillment, address, date, time, payment, total, and timestamps.

## PWA verification

Use a production preview rather than the development server, open browser developer tools, verify the manifest and service worker, then choose the browser’s install action. Public app-shell assets are cached; orders and account records deliberately retain network-first behaviour once a real backend is connected.

## Project structure

`client/src/components` contains reusable interface primitives and ordering components; `client/src/pages` contains route-level screens; `client/src/services` is the API boundary; `client/src/store` holds persisted local state; `client/src/data` contains mock data only; and `client/src/lib` contains shared formatting and tested order calculations.
