-- Ensure anonymous scanners can resolve links and log scans (/r/[slug])

grant usage on schema public to anon, authenticated;

grant select on table public.dynamic_qr_links to anon, authenticated;
grant insert on table public.dynamic_qr_scans to anon, authenticated;

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
