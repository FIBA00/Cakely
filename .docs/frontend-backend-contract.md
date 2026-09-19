# Cakely frontend-to-backend handoff

## Scope

Cakely is currently a frontend-first preview. Local mock services and browser storage make the journeys demonstrable, but they are not a production source of truth. The UI now exposes explicit preview and integration states so a backend can be connected without changing the customer-facing information architecture.

## Production boundaries

| Area              | Current frontend adapter                            | Required production contract                                                                                         |
| ----------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Identity          | Local/demo user state and route guards              | Manus OAuth session, user profile, role/tenant claims, session expiry and sign-out                                   |
| Catalogue         | Local cake and bakery data                          | Public catalogue query scoped by bakery, availability, dietary tags, images, price and currency                      |
| Custom cakes      | Client-side design object                           | Validated design schema, price quote, immutable design snapshot on order, uploaded reference-image key               |
| Cart              | Persisted browser cart                              | Server-validated cart or checkout quote; never trust client prices or bakery availability                            |
| Checkout          | Local preview order adapter                         | Idempotent order creation, server-side totals, delivery-zone validation, payment intent/status, confirmation email   |
| Orders            | Mock order list and status updates                  | Ownership-scoped order query, valid state machine, audit events, realtime/polling updates, cancellation/refund state |
| Addresses         | Browser-only address book                           | Authenticated CRUD, encrypted/sanitized storage, default-address rules, consent and deletion workflow                |
| Reviews           | Empty verified-review integration state             | Review creation only from eligible delivered orders, moderation status, rating aggregation, abuse/report flow        |
| Media             | Object URLs in preview and storage URL placeholders | Signed upload policy, MIME/size validation, malware scanning, image transformations, owner authorization             |
| Notifications     | Browser permission and preference UX                | Web-push subscription endpoint, email/SMS provider, preference enforcement, unsubscribe and delivery logs            |
| Analytics         | Optional consent-gated anonymous script             | Consent-aware event endpoint, no PII, retention policy, opt-out deletion and environment-specific IDs                |
| Bakery operations | Local owner workspace                               | Tenant-scoped catalogue, inventory, staff roles, payouts, exports, audit logs and publish workflow                   |
| Admin moderation  | Empty integration-ready moderation desk             | Tenant review, content reports, verified-review moderation, audit trail and least-privilege admin APIs               |

## Suggested API resources

`GET /api/v1/bakeries` returns only published bakeries and public summary fields. `GET /api/v1/bakeries/:slug/cakes` returns available catalogue items with dietary metadata. `GET /api/v1/cakes/:id` returns the product detail and verified-review summary.

`POST /api/v1/checkout/quote` validates the cart, bakery, fulfilment method, delivery zone, requested date and payment method. `POST /api/v1/orders` must require an idempotency key and return an order snapshot containing the authoritative total, currency, status and next action. `GET /api/v1/orders` and `GET /api/v1/orders/:id` must enforce customer ownership or an authorized bakery/admin role.

`POST /api/v1/custom-cakes/quote` validates the design object and returns the server price. `POST /api/v1/media/presign` returns a short-lived signed upload URL after authorization. `POST /api/v1/reviews` must verify that the authenticated customer has a delivered order containing the referenced cake.

## Frontend integration points

Replace `client/src/services/tenant.service.js`, `client/src/services/orders.service.js`, and the local account storage helpers with typed adapters. Preserve the current return shapes where possible so loading, empty, error, and offline states remain stable. Move price calculation, status transitions, tenant checks, and image authorization to the server.

The checkout page currently labels its local adapter as **Preview checkout** and catches adapter failures. In production, the adapter should call quote and order endpoints, redirect to a payment provider when required, and only clear the cart after the server confirms the order. The success page should retrieve the order by ID rather than relying only on navigation state.

## Security requirements

Enforce tenant ownership server-side on every owner operation. Validate all payloads with shared schemas, use secure session cookies, add CSRF protection where applicable, rate-limit authentication, checkout, uploads, support and review endpoints, and never accept client-submitted totals or status transitions as authoritative. Store only non-sensitive cache data in browser storage; move addresses and notification preferences to authenticated persistence when identity is connected.

## Release verification after backend connection

Run the complete browser suite against a staging API with seeded non-production fixtures, add contract tests for every adapter, verify payment failure and retry behavior, test expired sessions and unauthorized tenant access, validate webhook idempotency, and complete WCAG, performance, PWA update/offline, security, privacy and data-deletion acceptance checks before production launch.
