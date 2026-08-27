# Cakely feature extension

- [x] Add structured dietary metadata and dietary filtering to the catalogue URL/filter state.
- [x] Render dietary availability on product cards and product details.
- [x] Build a selection-driven live visual preview for the custom-cake builder.
- [x] Add an integration-ready reviews panel with a transparent no-reviews-yet state.
- [x] Validate the dietary and live-preview flows, then save a checkpoint.

## Top-down preview and language switching

- [x] Replace the custom cake sketch with a top-down decoration preview showing shape, color, message, and toppings.
- [x] Add a persistent English/Amharic language switch to customer-facing navigation and key custom-builder content.
- [x] Validate the top-view preview and both language states, then save a checkpoint.

## Advanced custom editor and expanded localization

- [x] Make cake size and cake type visibly affect the top-down preview scale and tier treatment.
- [x] Make flavor, color, top text position, and decoration placement visibly affect the preview in real time.
- [x] Add finalized cake-board PNG export and native/share-link controls.
- [x] Translate the catalogue, cart, checkout, and account experience into English and Amharic.
- [x] Validate the editor, sharing, and localized customer flows, then save a checkpoint.

## Final bilingual verification

- [x] Finalize English and Amharic i18n coverage and verify the persistent switch across catalogue, cart, checkout, account, and custom-cake flows.
- [x] Run final lint, unit, production-build, and browser validation.
- [x] Save the final bilingual checkpoint.

## Multi-tenant marketplace expansion

- [x] Complete Amharic order-status labels and form-validation errors.
- [x] Add mobile bottom navigation with safe-area spacing and active-route states.
- [x] Define tenant/shop data contracts, protected owner boundaries, and public catalogue contracts.
- [x] Build the cake-owner dashboard for finance, orders, cake uploads, categories, availability, and shop profile.
- [x] Build public bakery discovery and tenant storefront pages without requiring login.
- [x] Add tests for owner/public boundaries, bilingual status/error copy, and responsive navigation.
- [x] Validate the multi-tenant flows and save a final checkpoint.
- [x] Fix the public bakery browser assertion to target the visible View shop link, then rerun the full end-to-end suite.

## Review follow-ups before delivery

- [x] Audit every remaining customer and owner form and replace hard-coded validation or error strings with locale-backed English and Amharic messages; verify in browser.
- [x] Add real route/session gating for /owner or document and test the intentional demo-owner access path clearly.
- [x] Add automated assertions for English and Amharic order-status labels and localized validation errors.
- [x] Save a new checkpoint after the multi-tenant changes are fully validated.

## Demo owner preview access

- [x] Add an explicit, clearly labeled placeholder owner session for preview use.
- [x] Add a safe owner-dashboard entry action that uses the placeholder session without opening public guest access.
- [x] Validate the demo-owner dashboard load and guest/public boundaries, then save a checkpoint.
- [x] Save a checkpoint after the demo-owner preview access changes and successful validation suite.

## Order operations, finance charts, and cake geometry

- [x] Add a clear owner order-status progression with Done and Out for delivery states and localized labels.
- [x] Add monthly revenue and top-selling cake charts to the owner finance view.
- [x] Improve top-down cake geometry so shape, tiers, and decorations remain visually anchored and polished.
- [x] Add unit/browser coverage for status updates, charts, and geometry changes.
- [x] Validate the update and save a new checkpoint.
- [x] Add browser assertions for geometry-aware topping counts and placement positions across Border, Corners, Centre, and Scatter.
- [x] Save a checkpoint after the order-status, finance-chart, and cake-geometry update passes validation.

## Frontend finalization audit

- [x] Audit the current frontend against launch-critical accessibility, security, performance, reliability, commerce, SEO, analytics, and PWA requirements.
- [x] Produce a prioritized list of remaining frontend features and industry-standard launch checks.

## Frontend production hardening scope

- [x] Implement frontend-only P0 readiness: integration-ready persistence/auth/payment boundaries, order lifecycle states, customer account essentials, catalogue management UX, and legal/trust surfaces without fabricated backend data.
- [x] Implement P1 accessibility, responsive/device, PWA, error/recovery, SEO, performance, security/privacy, analytics, and localized-form hardening.
- [x] Implement eligible P2 enhancements except drag-and-drop/touch topping placement: verified-review UI contract, delivery-zone/ETA UI, reorder/favorites UX, coupons/gift cards/scheduled-order UI contracts, support handoff, owner reporting/staff/inventory UI contracts, admin moderation UX, visual/accessibility CI coverage, and install education/notification preferences.
- [x] Validate each completed section with unit, browser, accessibility, responsive, and production-build checks, then checkpoint the frontend-only release.
- [x] Add visual regression coverage for key customer screens at mobile and desktop widths.
- [x] Save a new checkpoint after the frontend hardening pass and final validation suite complete successfully.
