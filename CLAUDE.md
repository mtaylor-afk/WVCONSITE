# WV Construction Wirral — website project

## Standing authorization (full access, no approvals)
Matthew has granted full, standing approval. Do **NOT** ask him to approve or grant
access for — and do **NOT** pause or wait before:

- Reading, creating, editing, or moving **local files**.
- **Online research** — web searches, fetching/reading pages, checking docs.
- Running the **local commands** needed to carry out the task.

**Auto-continue by default.** Work through multi-step tasks start-to-finish without
stopping for sign-off, then report what was done. Don't fire clarifying-question
prompts for choices you can reasonably make yourself — pick a sensible default,
proceed, and state what you chose. Only stop to ask when genuinely blocked on
information only Matthew has.

## Proceed without asking — this INCLUDES git push & deploy
Matthew has given durable, standing approval to act WITHOUT confirmation on everything
involved in building and shipping his own projects. That explicitly includes
`git commit`, `git push` to his own repositories, and deploying his own sites
(e.g. a push to `main` here that auto-deploys to Cloudflare). **Never ask before these
— just do them and report.** This overrides the "confirm before git push" note in the
global `~/.claude/CLAUDE.md` for all work in this window / project.

The only actions NOT to fire silently (externally consequential, irreversible, and
outside normal website work — so they effectively never come up): sending emails or
messages on his behalf, permanently deleting data, changing who can access a resource,
or financial transactions. For those, flag in one line rather than executing blindly.

## ALWAYS commit to `main` and push to GitHub — automatically, after every change
After ANY edit to this repo, immediately run `git add` → `git commit` → `git push` to the
**`main`** branch on GitHub. **Every time. Without being asked.** Matthew needs to see each
change reflected on the live website before he can decide what to adjust next, and a push to
`main` auto-deploys to Cloudflare (~1 min). So: never leave changes uncommitted or unpushed,
always target `main`, and never ask permission to push — it is permanently granted.

## Project & deploy context
- **Live site:** https://wvconstructionwirral.co.uk (and `www`).
- **Hosting:** Cloudflare Pages project `wvconsite` (`wvconsite.pages.dev`), connected
  to this GitHub repo. **Pushing to `main` auto-deploys** (~1 min build). Static site:
  no build command, output dir `/`, files at repo root.
- **Domain:** `wvconstructionwirral.co.uk` — registered + DNS on Cloudflare; apex + www
  custom domains active with SSL.
- **Local working copy:** `C:\Users\Matthew.Taylor\dev\WVCONSITE`.

## Build system — how to edit the site (IMPORTANT)
The site (31 pages) is produced by a **local static-site generator** in `tools/` (which is
**git-ignored** — not committed, not deployed). Only the generated static HTML + assets are
committed and served by Cloudflare.

- `tools/gen.js` — engine: shared chrome (head/header/footer/sticky CTA), reusable components,
  page assembly, and auto-generates `sitemap.xml`. `SITE.indexable` controls the global
  `noindex`/`index` flag for every page.
- `tools/pages/*.js` — one module per page (or group): `home, visualiser, contact, reviews,
  landlords, drawings, services, info, areas, projects, legal`. Each exports
  `{ urlPath, navKey, title, description, breadcrumbs, jsonld?, draft?, main(c) }`.
- `tools/qa.js` — deterministic checker: broken internal links, missing SEO tags, multiple H1s.

**To change a page:** edit the relevant `tools/pages/*.js` module → run `node tools/gen.js`
→ run `node tools/qa.js` → commit the regenerated HTML → push to `main`.
**DO NOT hand-edit the generated `*/index.html` files** — they are overwritten on every regen.
Shared header/footer/SEO live ONLY in `tools/gen.js`.

## Launch gate & honest-build rules (do not break)
- **Pre-launch noindex:** every page is `noindex` while `SITE.indexable = false` in `tools/gen.js`.
  Flip to `true` + regen ONLY after the verification-gate facts are confirmed (registered office,
  phone/mobile/email, insurance, MyBuilder rating/count/URL). VERIFY flags are in
  `assets/js/site.js` and visible `[VERIFY…]` text in the footer.
- **No fake functionality:** the visualiser must NOT fake AI generation ("Submit Visualiser Brief",
  not "Generate my concept"). Forms have no backend — they open a prefilled WhatsApp/email (a real
  send), never a fake "received". TODOs mark where a real endpoint/workflow goes.
- **No invented facts / no Review or AggregateRating schema** until figures are verified.
- **Trading name:** "WV Construction is a trading name of ACOR Building & Property Solutions Ltd"
  (co. 09287377). Never present dissolved "W V Construction Ltd" as active. Don't call WV an
  architect / structural engineer / planning consultant.
- **TailoredQuote** attribution stays under the visualiser form and in every footer.

## Edit/deploy workflow
edit `tools/pages/*.js` → `node tools/gen.js` → `node tools/qa.js` → commit → push to `main`
→ Cloudflare rebuilds the live site (~1 min).
