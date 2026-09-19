# Cakely Frontend Finalization Checklist

**Audit date:** 27 August 2026  
**Scope:** Customer storefront, custom-cake builder, checkout, account area, bakery marketplace, owner workspace, admin foundation, bilingual UX, PWA, accessibility, performance, SEO, analytics, and launch readiness.

## Executive conclusion

Cakely already has a strong functional frontend foundation. The public browsing journey, multi-bakery discovery, tenant storefronts, dietary filters, bilingual English/Amharic interface, top-down cake builder, cart, checkout form, order tracking screens, owner workspace, finance charts, order status progression, responsive bottom navigation, PWA build, and automated browser coverage are in place.

The application should **not yet be considered production-final** because the visible frontend is still connected to mock/local service boundaries, demo authentication, localStorage order state, and placeholder account screens. Payment completion, durable persistence, real customer and bakery identity, inventory/order consistency, and production-grade operational states must be completed before accepting real orders. The checklist below distinguishes launch blockers from important hardening and post-launch improvements.

## Current coverage

| Area                                      | Current state                                                                                                                              | Assessment                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Public home, catalogue, product details   | Implemented with search, dietary metadata, product details, and empty states                                                               | Ready for backend integration                                                                           |
| Bakery marketplace and tenant storefronts | Implemented for published bakeries and available cakes                                                                                     | Ready for backend integration                                                                           |
| Custom cake builder                       | Implemented with live top-down preview, size/shape/flavor/color/finish/text/decorations, export/share controls, and geometry-aware anchors | Functional; drag placement remains optional enhancement                                                 |
| Cart and checkout UI                      | Implemented with validation and bilingual errors                                                                                           | Not production-ready until payment, persistence, pricing, and order confirmation are server-backed      |
| Customer accounts                         | Profile, order history, favorites implemented; Addresses and Settings are placeholder screens                                              | Incomplete                                                                                              |
| Owner workspace                           | Profile, catalogue availability, uploads, order status, finance charts, and public publishing UI implemented                               | Not production-ready while services use mock state and no real role/tenant persistence                  |
| Reviews                                   | Transparent no-reviews-yet/integration-ready state                                                                                         | Correctly avoids fabricated reviews; real verified-review workflow remains                              |
| Authentication                            | Protected route boundary plus explicit demo-owner preview path                                                                             | Replace demo/mock auth with real customer and owner identity before launch                              |
| Localization                              | Broad English/Amharic coverage including statuses and validation                                                                           | Needs final audit for all server errors, dates, currency, pluralization, metadata, and uploaded content |
| PWA                                       | Service worker and manifest generation configured; prompt registration enabled                                                             | Verify installability, update UX, offline fallback, icons, and iOS behavior on real devices             |
| Automated validation                      | Lint, unit tests, production build, and 10 passing E2E tests                                                                               | Add accessibility, mobile-device, payment, failure-state, and visual regression coverage                |

## P0 — Must complete before real customer launch

### 1. Replace mock services with durable server persistence

Move cakes, bakeries, menus, availability, customer profiles, addresses, favorites, carts, custom-cake configurations, orders, order status history, and finance aggregates from `mockData`, in-memory state, and localStorage into the enabled Drizzle/database and tRPC procedures. The browser must never be the source of truth for price, availability, ownership, order totals, or order status.

The frontend work includes query loading states, mutation pending states, optimistic updates only where safe, cache invalidation, retry behavior, stale-data messaging, and conflict handling when a cake sells out or a bakery changes availability while a customer is checking out.

### 2. Implement real authentication and role/tenant authorization

Replace the demo-owner and mock auth boundary with real Manus OAuth-backed customer and bakery-owner sessions. The UI must distinguish unauthenticated customers, authenticated customers, bakery owners, and platform administrators. Owner pages must be tenant-scoped, and every owner mutation must be rejected visually and server-side when the user does not own the bakery.

Add sign-in redirect preservation, sign-out, session-expiry recovery, unauthorized and forbidden states, account deletion/export entry points, and clear handling for OAuth cancellation or failure. The current explicit demo-owner preview can remain only in a non-production development mode.

### 3. Complete payment and order finalization

Add a real payment provider flow and connect it to checkout. The frontend must show an order summary with server-confirmed prices, delivery fees, taxes or VAT where applicable, discounts, currency, and the final payable total. Add payment pending, success, failure, cancellation, retry, duplicate-submit prevention, and abandoned-checkout states.

The success page must be based on a verified order response rather than a client-generated order ID. The customer should receive an order reference, bakery, pickup/delivery method, scheduled time, payment state, and next steps. Never collect or store raw card details in the Cakely frontend.

### 4. Make order lifecycle and fulfillment production-safe

Define and display a complete order state machine, for example: pending payment, paid, accepted, preparing, ready, out for delivery, completed, cancelled, and refunded. Show which transitions are allowed, who can perform them, and what happens on failed or expired orders.

Add customer notifications or an in-app activity timeline, delivery/pickup details, contact/help escalation, cancellation/refund rules, and explicit time-zone-aware date/time formatting. Owner status updates must be persisted atomically and must not permit arbitrary or backwards transitions without a documented exception.

### 5. Finish customer account essentials

Replace the current Addresses and Settings placeholders with working screens. Minimum account scope should include saved delivery addresses with validation and default selection, contact preferences, language preference, notification preferences, privacy/security links, and account deletion or support contact. Saved favorites should be durable and account-scoped rather than only client-state based.

### 6. Implement real catalogue and bakery management behaviors

The owner UI needs create/edit/delete or archive flows for cakes, categories, prices, dietary flags, images, serving sizes, lead times, stock/availability, featured status, and bakery opening/closing state. Add confirmation dialogs for destructive actions, unsaved-change warnings, upload progress, upload validation, image crop/preview, and recoverable upload errors.

The customer UI needs clear sold-out, temporarily unavailable, preorder, minimum lead-time, and bakery-closed states. Search and filters should be backed by stable URL state and should preserve selection when navigating back from product details.

### 7. Complete legal and trust surfaces

Before taking real customer information or payments, add Terms of Service, Privacy Policy, cookie/analytics disclosure where required, refund/cancellation policy, delivery/pickup policy, allergy and cross-contamination disclaimer, bakery contact/support path, and consent copy. The checkout should explicitly communicate what information is shared with the bakery and the platform.

## P1 — Required production hardening

### Accessibility: target WCAG 2.2 AA

Run an automated and manual accessibility audit against WCAG 2.2 AA. The standard covers keyboard operation, no keyboard traps, focus order and visibility, focus not obscured, labels and instructions, error identification and suggestions, target size, contrast, reflow, language metadata, and accessible authentication.[1]

For Cakely specifically, verify semantic headings and landmarks, skip navigation, visible focus rings, keyboard operation of every selector/dialog/drawer/chart control, accessible names for icon-only buttons, correct error announcement with `aria-describedby` and `aria-live`, modal focus trapping and restoration, sufficient target sizes, contrast for the pink/cream palette, reduced motion, screen-reader output for the cake preview, accessible alternatives to drag-and-drop, and correct `lang` updates for English and Amharic.

### Responsive and device quality

Test the full customer and owner flows at narrow phones, large phones, tablets, desktop, zoomed text, landscape orientation, touch input, mouse, keyboard, and screen readers. Verify safe-area padding, sticky headers/bottom navigation, virtual keyboard behavior on checkout, file/image upload on mobile, share/export fallbacks, and no horizontal overflow.

### PWA completion

The current build uses a service worker and manifest, but launch verification should confirm a valid install prompt, correct icons at required sizes, standalone display, update notification behavior, cache versioning, offline fallback, and safe behavior when a user opens cached screens without connectivity. web.dev’s PWA checklist treats fast startup, cross-browser behavior, responsive layouts, an offline fallback/experience, installability, accessibility, search discoverability, input support, contextual permission requests, and healthy code as core or optimal quality criteria.[2]

Do not cache private account, checkout, payment, or owner responses in a way that can expose one user’s data to another. Provide an explicit offline banner and queue only actions that are safe to retry.

### Error, loading, and recovery UX

Every route and data boundary needs loading skeletons, empty states, retry actions, network-error states, permission-denied states, not-found states, and session-expired recovery. Add a global error boundary with a useful recovery action and route-level error reporting. Toasts should supplement, not replace, inline accessible confirmation and error text.

### SEO and sharing

Add canonical URLs, route-aware titles and descriptions, Open Graph and Twitter metadata including image, `robots.txt`, XML sitemap, proper `lang` and alternate locale metadata, structured data for Organization/Bakery, Product, BreadcrumbList, and potentially LocalBusiness where data is real and consented. Product and bakery pages should be crawlable and should not depend entirely on client-only rendering if organic discovery is a launch goal.

Do not expose private owner routes, customer data, fake review counts, or fabricated ratings in metadata. Keep the current no-fabricated-review policy.

### Performance and image quality

Measure Core Web Vitals on representative mobile devices and slow networks. Optimize the large hero and cake imagery with responsive sizes, modern formats, lazy loading below the fold, explicit dimensions to prevent layout shift, and appropriate `fetchpriority` for the true hero image. Confirm that code splitting is effective on public, checkout, owner, and admin routes; investigate the current large main JavaScript chunk warning rather than accepting it without measurement.

### Security and privacy UI

Add CSRF/session-expiry behavior through the server integration, avoid sensitive data in URLs and localStorage, sanitize customer-provided cake messages and notes, validate file MIME/type/size and image dimensions, and ensure upload previews cannot execute active content. Confirm that analytics excludes names, phone numbers, addresses, order notes, payment details, and authentication data. Add a privacy-conscious consent state if required for the deployment region.

### Analytics and observability

Define a privacy-safe event taxonomy for catalogue view, filter use, bakery view, cake customization, add-to-cart, checkout start, payment result, order success, cancellation, owner publish, and errors. Add correlation/order IDs that do not contain personal information, frontend error monitoring, Web Vitals reporting, and alerts for payment, checkout, and order API failures. Verify analytics is disabled or minimized before consent where required.

### Forms and content correctness

Use correct `autocomplete` tokens for name, email, phone, address, and payment-provider fields. Add input-mode and type hints, paste support, server validation feedback, prevention of accidental double submission, and clear field-level corrections. Localize dates, numbers, currency, pluralization, validation, status, legal copy, and share/export fallbacks in both English and Amharic. Confirm Amharic line wrapping, font fallback, truncation, and mixed-script accessibility names.

## P2 — Important enhancements after the launch baseline

| Enhancement                                                                  | Why it matters                                                                                                                                                      |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Drag-and-drop or touch placement for individual toppings                     | Improves creative control; must include keyboard and preset-position alternatives because WCAG 2.2 includes dragging and input-modality considerations.[1]          |
| Real verified reviews and ratings                                            | Builds trust after verified order completion; requires moderation, reporting, pagination, owner response, and anti-abuse controls. Never seed or fabricate reviews. |
| Bakery delivery zones, map/address autocomplete, and ETA                     | Makes multi-tenant ordering operationally useful; requires privacy, address validation, and fallback for unsupported locations.                                     |
| Customer reorder and favorites synchronization                               | Reduces friction for repeat orders and makes account value tangible.                                                                                                |
| Coupons, gift cards, scheduled ordering, and recurring celebration reminders | Commercial growth features after core payments and order lifecycle are reliable.                                                                                    |
| Customer support inbox or ticket handoff                                     | Provides recovery for late, damaged, incorrect, or allergy-related orders.                                                                                          |
| Owner inventory, staff roles, payout statements, and exportable reports      | Moves the workspace from a demo dashboard toward a bakery operations product.                                                                                       |
| Platform admin moderation and tenant approval                                | Necessary for a true marketplace: bakery verification, suspension, content moderation, complaint handling, and audit logs.                                          |
| Visual regression and accessibility CI                                       | Protects the bilingual, responsive design from regressions as the product grows.                                                                                    |
| Install education and notification preferences                               | Improves PWA adoption without showing permission prompts before explaining their value.                                                                             |

## Recommended finalization order

First, complete persistence, real authentication, payment, order lifecycle, account addresses/settings, and legal/trust surfaces. Second, perform the WCAG 2.2 AA, mobile-device, PWA offline/install, security/privacy, SEO, performance, and failure-state hardening pass. Third, run a release-candidate test matrix using real bakery/customer accounts and payment sandbox cases. Only after those gates pass should Cakely be treated as launch-ready. Drag-and-drop customization, verified reviews, delivery intelligence, advanced admin tools, and growth features can follow as deliberate P2 work.

## Release-candidate acceptance gates

| Gate                 | Pass condition                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer purchase    | A new user can browse, customize, pay in sandbox, receive a persisted order, and recover from payment failure.                                                |
| Bakery operation     | An owner can manage only their bakery, publish accurate availability, accept an order, progress it through valid states, and see persisted finance data.      |
| Account              | A customer can authenticate, manage profile/address/settings, view order history, and sign out or recover an expired session.                                 |
| Accessibility        | Critical journeys pass keyboard, screen-reader, contrast, focus, zoom, and reduced-motion checks at WCAG 2.2 AA target.[1]                                    |
| PWA                  | Install, update, offline fallback, online recovery, and private-data cache behavior are verified on supported browsers.[2]                                    |
| Trust and compliance | Policies, allergy messaging, consent/privacy treatment, refunds/cancellations, support contact, and real bakery identity are visible before order completion. |
| Performance          | Mobile performance is measured with production-like assets and meets the team’s agreed Core Web Vitals budget.                                                |
| Quality              | Lint, type check, unit, integration, E2E, accessibility, visual regression, and production build checks pass in CI.                                           |

## References

[1]: https://www.w3.org/WAI/WCAG22/quickref/ "W3C — How to Meet WCAG 2.2"
[2]: https://web.dev/articles/pwa-checklist "web.dev — What makes a good Progressive Web App?"
