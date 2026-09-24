-- Přihlášky do 2AM Drive Clubu.
-- Web smí jenom zapisovat; číst je můžou pouze přihlášení členové týmu
-- přes Supabase dashboard nebo service role klíč.

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name        text not null check (char_length(trim(name)) between 2 and 120),
  email       text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone       text check (phone is null or char_length(phone) <= 40),
  city        text check (city is null or char_length(city) <= 120),

  car         text not null check (char_length(trim(car)) between 2 and 200),
  instagram   text check (instagram is null or char_length(instagram) <= 120),
  motivation  text not null check (char_length(trim(motivation)) between 10 and 2000),

  -- pending → approved / rejected; mění se ručně, dokud je členů málo
  status      text not null default 'pending'
              check (status in ('pending', 'approved', 'rejected')),
  note        text
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

create index if not exists applications_status_idx
  on public.applications (status);

-- Jeden člověk, jedna přihláška.
create unique index if not exists applications_email_key
  on public.applications (lower(email));

alter table public.applications enable row level security;

-- Anon role smí vložit přihlášku a nic víc: žádný select, update ani delete.
drop policy if exists "anon can submit application" on public.applications;
create policy "anon can submit application"
  on public.applications
  for insert
  to anon
  with check (true);
