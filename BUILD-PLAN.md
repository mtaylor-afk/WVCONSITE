# WV Construction Wirral — Build Plan

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done · `(draft)` built but noindex

## Architecture (locked)
- Buildless static HTML, clean URLs via `folder/index.html`.
- Shared `/assets/css/styles.css`, `/assets/js/main.js`, `/assets/js/site.js` (business config + VERIFY flags).
- Header / footer / sticky-CTA inlined per page from one canonical block (QA enforces identical).
- Forms: no backend → validate, then open prefilled **WhatsApp + email** (real send). Honeypot. `TODO` real endpoint.
- Visualiser: full UI + disclaimers + TailoredQuote badge, **no fake AI generation**.
- Cloudflare-native: `_headers`, `_redirects` (www→apex 301), `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`.
- **Pre-launch: every page `noindex` until facts verified.** One switch flips to indexable.
- Palette: navy #1B2A4A, gold #C9A84C, cream #F5F0E8, charcoal #151515, warm white #FAF8F2, soft grey #EEF0F3, success green only for postcode.
- Type: Cormorant Garamond (headings) + Inter (body), limited weights.

## M1 — Foundation + Homepage
- [ ] assets/css/styles.css — tokens, layout, all components
- [ ] assets/js/site.js — business config (brand, legal, contacts VERIFY, mybuilder, tailoredquote, flags)
- [ ] assets/js/main.js — mobile menu, sticky CTA, postcode checker (aria-live), form→WhatsApp/email, image preview, year
- [ ] Canonical header + footer + sticky CTA + TailoredQuote badge + trust bar (embodied in index.html as reference)
- [ ] index.html — homepage, 12 sections
- [ ] 404.html
- [ ] assets/img placeholders (hero, project, tailoredquote badge) as SVG
- [ ] _headers, _redirects, robots.txt

## M2 — Conversion core
- [ ] /contact/ + /contact/thank-you/
- [ ] /visualiser/ (full form, disclaimers, below-form sections, TailoredQuote badge, NO fake AI)
- [ ] /visualiser/thank-you/
- [ ] /visualiser-terms/
- [ ] /reviews/ (MyBuilder, historic wording, paraphrased, no review schema)
- [ ] /landlords/ + /landlords/maintenance-request/
- [ ] /already-have-drawings/
- [ ] /builder-quote-from-drawings/

## M3 — Services & journeys
- [ ] /services/ (hub)
- [ ] /services/residential-extensions/
- [ ] /services/renovations-refurbishments/
- [ ] /services/property-maintenance/
- [ ] /services/landlord-maintenance/
- [ ] /services/void-property-refurbishments/
- [ ] /services/general-building-works/
- [ ] /homeowners/
- [ ] /process/
- [ ] /faqs/
- [ ] /about/

## M4 — Areas & projects
- [ ] /areas/ (hub)
- [ ] /areas/wirral/  /areas/liverpool/  /areas/wallasey/  /areas/birkenhead/
- [ ] /projects/ (example project types, placeholder-safe, no fake completed work)

## M5 — Legal & discovery
- [ ] /privacy/  /cookies/  /terms/
- [ ] sitemap.xml (launch-ready pages only)
- [ ] llms.txt  ai.txt

## M6 — QA + report
- [ ] Internal link check (no broken links)
- [ ] Header/footer/SEO-tag consistency across pages
- [ ] Compliance: no fake AI, trading-name wording, no review schema, no invented claims
- [ ] Accessibility pass: labels, alt, focus, skip link, aria-live, contrast
- [ ] Final report + verification gates

## Phase 2 (build only when uniquely useful; else draft/noindex)
Rear Extensions · Kitchen Extensions · End-of-Tenancy Repairs · Structural Openings & Internal Alterations ·
Bathrooms/Kitchens/Internal Works · Send Photos · Build Cost Estimate ·
Areas: Heswall, West Kirby, Bebington, New Brighton, Bootle, South Liverpool · Advice hub + 5 articles.

## Phase 3 (after real photos/proof)
Areas: Hoylake, Moreton, Upton, Greasby, Oxton, Port Sunlight, Prenton ·
Roofing/Rendering/Brickwork service page · real project case studies · more advice · live visualiser backend · Google reviews.

## Verification gates (must confirm before flipping site to indexable)
registered office · phone · mobile · email · insurance status · accreditations · offered trades ·
project photos (none used as "completed") · MyBuilder rating/count · MyBuilder URL · visualiser backend status.
