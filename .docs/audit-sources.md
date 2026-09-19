# Cakely launch-audit sources

## W3C WCAG 2.2

Source: https://www.w3.org/WAI/WCAG22/quickref/

Relevant checks for Cakely include text alternatives, language of page and parts, contrast, reflow, keyboard operation, no keyboard traps, focus order and visibility, focus not obscured, link purpose, target size, dragging alternatives, predictable input behavior, labels/instructions, error identification and suggestions, and accessible authentication. The target should be WCAG 2.2 AA for the storefront and owner workspace.

## web.dev PWA checklist

Source: https://web.dev/articles/pwa-checklist

A production PWA should start fast and stay fast, work across browsers and screen sizes, provide an offline fallback/experience, be installable, be fully accessible, be discoverable in search, support all input types, provide context before permission prompts, and follow healthy-code practices. These are audit criteria rather than proof that the current app already satisfies each one.

## Project evidence

The current Cakely frontend has public storefront, bakery marketplace, tenant storefront, custom cake builder, cart, checkout, order success/tracking, account profile/orders/favorites, owner workspace, admin foundation, English/Amharic localization, PWA plugin, code splitting, and automated lint/unit/E2E coverage.

The current source still shows mock/local-only service boundaries (`mock://cakely`, mock data, localStorage orders, demo auth), placeholder account pages for Addresses and Settings, and a reviews service that is integration-ready but does not yet display real verified customer feedback. Payment processing, real persistence, real OAuth/customer identity, and production-grade owner/customer data flows remain unfinished.

Metadata currently includes title, description, theme color, Open Graph title/description, and favicon. The audit still needs to verify canonical URLs, locale-aware metadata, OG/Twitter image, robots.txt, sitemap, structured data, offline fallback, install prompt/manifest quality, and route-aware SEO behavior.
