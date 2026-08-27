# Cakely Design Brainstorm

## Approach 1 — Patisserie Postcard

**Theme Name:** Patisserie Postcard

**Very Brief Intro:** An editorial bakery experience inspired by handwritten order cards, soft paper stock, and the deliberate beauty of a neighbourhood patisserie. It turns browsing into the feeling of choosing a cake from a counter that knows every occasion matters.

**Probability:** 0.07

## Approach 2 — Confectionery Gallery

**Theme Name:** Confectionery Gallery

**Very Brief Intro:** A quiet, high-fashion product gallery that treats each cake as a sculptural celebration piece. Large photography, high contrast type, and roomy composition create an elevated, almost exhibition-like store.

**Probability:** 0.04

## Approach 3 — Garden Party Ledger

**Theme Name:** Garden Party Ledger

**Very Brief Intro:** A bright, botanical direction combining sun-faded paper, recipe annotations, and small garden motifs. It would feel charming and local while retaining a crisp, contemporary checkout experience.

**Probability:** 0.09

---

# Chosen Direction — Patisserie Postcard

## Design Movement

**Contemporary editorial hospitality** with cues from French patisserie packaging and tactile stationery. The digital application should feel like a personal cake consultation expressed through rich photography, a carefully paced composition, and practical commerce affordances.

## Core Principles

1. **Cake first:** Every hierarchy choice creates space for vivid cake imagery, ingredients, and the moments around an order.
2. **Tactile restraint:** Paper-toned surfaces, hairline rules, carefully rounded image corners, and restrained shadows imply thoughtful craftsmanship without mimicking a scrapbook.
3. **Editorial rhythm:** Mix sweeping feature blocks with compact product cards and annotated side notes rather than relying on a repetitive centered grid.
4. **Warmly precise:** The interface is friendly and celebratory, but controls, order details, and checkout states remain clear, calm, and exact.

## Color Philosophy

The canvas is a **vanilla paper** rather than clinical white, allowing cake photography and deep cocoa typography to feel richer. Cakely’s signature **raspberry lacquer** is reserved for active choices, primary actions, and key delight moments; butter yellow and soft peach provide warmth in supportive surfaces. Forest green appears only as a natural success signal. The signature brand color is **Cakely Raspberry — #C93F63**.

## Layout Paradigm

The app uses a **catalogue-and-counter** composition: content sits on a broad editorial canvas with occasional narrow annotation rails, overlapping product imagery, and offset feature panels. The homepage hero is a split counter scene rather than a centered marketing block. Shop pages pair a compact, sticky filter rail with a generous browsing field; account and admin pages use purpose-built information panels rather than a generic dashboard shell.

## Signature Elements

1. A slender **raspberry ribbon line** that offsets category names, section labels, and progress states.
2. Soft **postage-stamp scallops** and clipped-corner frames used sparingly around primary visual moments.
3. Small **occasion seals**—simple icons inside butter-toned circular marks—for categories, order milestones, and customisation choices.

## Interaction Philosophy

Interaction should feel like a thoughtful counter service: quick add actions provide immediate cart feedback; customisation choices reveal a clear live summary; drawers and forms keep the user in context. Every action receives a concise confirmation, and every navigation path has a clear way back.

## Animation

Use a snappy, low-key motion language. Product cards lift by 2–4px and images subtly scale on hover; drawers enter with a 240ms ease-out; product and page groups use a 40ms stagger; buttons scale to 0.97 on press. The raspberry ribbon can travel across order progress in short transform-based transitions. All nonessential motion must be disabled with `prefers-reduced-motion`.

## Typography System

**DM Serif Display** carries feature headings, cake names, and expressive numbers with an unhurried editorial tone. **Manrope** is the workhorse UI face for labels, filters, forms, prices, and body copy. Feature headings use a compact line height and responsive range; UI labels use modest all-caps tracking only for metadata; body copy stays highly legible at mobile sizes.

## Brand Essence

**Cakely is the personal cake counter for people who want celebration pieces as considered as the moments they mark.**

Personality: **considered, celebratory, generous**.

## Brand Voice

Headlines are concise, sensory, and occasion-aware. CTAs sound like a helpful baker, not a generic conversion prompt. Microcopy makes practical details feel reassuring and direct.

Example lines:

> Made for your moment. Finished by hand.

> Tell us the story; we will make the cake.

## Wordmark & Logo

The wordmark uses an editorial serif with a single hand-drawn underline sweep implied beneath the “ly,” accompanied by a standalone mark: a **cherry-topped cake slice inside a raspberry ribbon arch**. The mark is graphic, text-free, and recognisable when reduced to an app favicon.

## Style Decisions

- The Cakely wordmark always uses editorial serif lettering with a hand-drawn underline sweep beneath “ly,” paired with the cherry-topped cake-slice ribbon-arch mark.
- The homepage begins as a decisive asymmetric split counter: dominant cake photography is framed by counter labels and paper order-card details rather than treated as background decoration.
- Clipped-corner, postage-stamp framing is reserved for the hero visual, selected catalogue feature, custom-cake summary, and order/checkout moments; it is not repeated on every product card.
