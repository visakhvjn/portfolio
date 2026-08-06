# Supabase (Playground)

This repo uses **two Supabase projects** — one per Playground app. Migrations live in separate folders so nothing gets mixed up.

| App | Folder | Env vars |
|-----|--------|----------|
| MCQ Quiz | [`mcq-quiz/migrations/`](mcq-quiz/migrations/) | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Dynamic QR | [`dynamic-qr/migrations/`](dynamic-qr/migrations/) | `NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL`, `NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_ANON_KEY` |

Auth is **per project** (separate magic-link sign-in for each app).

## Apply migrations

**Option A — SQL Editor (simplest)**  
Open each Supabase project → SQL Editor → run **only** that app’s files:

- **MCQ project:** `20260326000000_initial.sql`, then (if Dynamic QR was ever run there by mistake) `20260326110000_remove_dynamic_qr_tables.sql`
- **Dynamic QR project:** `20260326100000_initial.sql` only

Never run files from `supabase/dynamic-qr/` on the MCQ project.

**Option B — CLI**  
Link to the MCQ ref, copy **only** `supabase/mcq-quiz/migrations/*.sql` into `supabase/migrations/`, then `supabase db push`. For Dynamic QR, link to the other ref and copy **only** `supabase/dynamic-qr/migrations/*.sql`. Do not push both sets to one project.

## Auth redirect URLs

| Project | Redirect URL |
|---------|----------------|
| MCQ Quiz | `https://your-domain.com/auth/callback` |
| Dynamic QR | `https://your-domain.com/auth/callback/dynamic-qr` |

Local: replace host with `http://localhost:3000`.

See [`.env.example`](../.env.example) for all variables.
