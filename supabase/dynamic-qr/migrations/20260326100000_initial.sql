-- Dynamic QR — apply in the Dynamic QR Supabase project only
-- Path: supabase/dynamic-qr/migrations/

create table if not exists public.dynamic_qr_links (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  slug text not null unique,
  destination_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists dynamic_qr_links_owner_id_idx on public.dynamic_qr_links (owner_id);
create index if not exists dynamic_qr_links_slug_idx on public.dynamic_qr_links (slug);

create table if not exists public.dynamic_qr_scans (
  id uuid primary key default gen_random_uuid(),
  qr_id uuid not null references public.dynamic_qr_links (id) on delete cascade,
  scanned_at timestamptz not null default now(),
  user_agent text,
  device_type text,
  country text,
  region text,
  city text,
  referrer text
);

create index if not exists dynamic_qr_scans_qr_id_idx on public.dynamic_qr_scans (qr_id);
create index if not exists dynamic_qr_scans_scanned_at_idx on public.dynamic_qr_scans (scanned_at);

alter table public.dynamic_qr_links enable row level security;
alter table public.dynamic_qr_scans enable row level security;

drop policy if exists "Owners manage own dynamic QR links" on public.dynamic_qr_links;
create policy "Owners manage own dynamic QR links"
  on public.dynamic_qr_links
  for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "Anyone can read links for redirect" on public.dynamic_qr_links;
create policy "Anyone can read links for redirect"
  on public.dynamic_qr_links
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can log scans" on public.dynamic_qr_scans;
create policy "Anyone can log scans"
  on public.dynamic_qr_scans
  for insert
  to anon, authenticated
  with check (
    exists (
      select 1 from public.dynamic_qr_links l where l.id = qr_id
    )
  );

drop policy if exists "Owners read scans on own links" on public.dynamic_qr_scans;
create policy "Owners read scans on own links"
  on public.dynamic_qr_scans
  for select
  to authenticated
  using (
    exists (
      select 1 from public.dynamic_qr_links l
      where l.id = qr_id and l.owner_id = auth.uid()
    )
  );
