# Visual QA note

## 27 August 2026

The desktop shell, catalogue, custom cake board, and policies page were visually reviewed at 1280px. The mobile shell, support page, login/account entry, and home page were reviewed at 390x844.

The responsive layout remains readable, the top-view cake board keeps its visual hierarchy, the policies cards reflow cleanly, and the footer/mobile navigation remain reachable. The privacy-consent notice is visible and its controls are accessible without preventing unrelated navigation. The support page exposes the contact methods and frontend-only handoff form. The login screen remains an explicit preview boundary rather than implying a live identity connection.

The mobile home hero is intentionally image-led and crops the cake on narrow screens; this preserves the visual composition but should be checked on real iOS Safari and low-bandwidth devices before production. The privacy notice is intentionally prominent until consent is recorded and may cover lower-page content; its controls remain the primary interaction target.
