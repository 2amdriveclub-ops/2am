-- Kdy uchazeč potvrdil kodex klubu (porušení = blacklist).
-- Web ho bez souhlasu nepustí dál; tady je doklad, že souhlas dal.

alter table public.applications
  add column if not exists code_accepted_at timestamptz;

-- Nové přihlášky z webu musí mít souhlas vyplněný. Starší řádky (pokud nějaké jsou)
-- zůstanou s null, proto to hlídá policy, ne `not null` na sloupci.
drop policy if exists "anon can submit application" on public.applications;
create policy "anon can submit application"
  on public.applications
  for insert
  to anon
  with check (status = 'pending' and note is null and code_accepted_at is not null);
