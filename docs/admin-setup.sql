-- One-time setup for the private leads dashboard at https://queuesolutions.org/admin
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.
--
-- Before running: create your admin login in Authentication -> Users -> "Add user"
-- (tick "Auto Confirm User"), then make sure the email below matches it exactly.

-- 1) Row-level security keeps the public website key from reading any leads.
alter table public.leads enable row level security;

-- 2) Keep the website able to SAVE leads. Only created if no insert policy exists yet,
--    so an existing one is left untouched.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'leads' and cmd = 'INSERT'
  ) then
    create policy "Website can insert leads" on public.leads
      for insert to anon, authenticated
      with check (true);
  end if;
end $$;

-- 3) Let ONLY the admin account read leads.
drop policy if exists "Admin can read leads" on public.leads;
create policy "Admin can read leads" on public.leads
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'queuesolutions25@gmail.com');

-- 4) Let ONLY the admin account change a lead's status (New, Contacted, Installed, Paid,
--    Not interested) from the dashboard.
drop policy if exists "Admin can update leads" on public.leads;
create policy "Admin can update leads" on public.leads
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'queuesolutions25@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'queuesolutions25@gmail.com');
