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

## Project & deploy context
- **Live site:** https://wvconstructionwirral.co.uk (and `www`).
- **Hosting:** Cloudflare Pages project `wvconsite` (`wvconsite.pages.dev`), connected
  to this GitHub repo. **Pushing to `main` auto-deploys** (~1 min build). Static site:
  no build command, output dir `/`, files at repo root.
- **Domain:** `wvconstructionwirral.co.uk` — registered + DNS on Cloudflare; apex + www
  custom domains active with SSL.
- **Local working copy:** `C:\Users\Matthew.Taylor\dev\WVCONSITE`.
- **Edit workflow:** edit files → commit → push to `main` → Cloudflare rebuilds live site.
