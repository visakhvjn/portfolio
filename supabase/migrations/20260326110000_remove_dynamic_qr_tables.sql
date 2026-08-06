-- MCQ Quiz Supabase project only — remove Dynamic QR schema if it was applied by mistake.
-- Do not run this on the Dynamic QR project.

drop table if exists public.dynamic_qr_scans cascade;
drop table if exists public.dynamic_qr_links cascade;
