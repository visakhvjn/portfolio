-- Add richer scan metadata for Dynamic QR analytics

alter table public.dynamic_qr_scans
  add column if not exists os_name text,
  add column if not exists browser_name text;
