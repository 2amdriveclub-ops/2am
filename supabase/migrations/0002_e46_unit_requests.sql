-- Poptávky hotových jednotek MS43 s MS43X (stránka /e46-garage).
-- Web smí jen zapisovat nové poptávky; stav a interní poznámku mění tým
-- přes Supabase dashboard nebo service role klíč.

create table if not exists public.e46_unit_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  mode      text not null check (mode in ('exchange', 'buy')),
  engine    text not null check (engine in ('M54B22', 'M54B25', 'M54B30', 'unknown')),
  gearbox   text not null check (gearbox in ('manual', 'automatic')),
  vin_tail  text check (vin_tail is null or vin_tail ~ '^[A-HJ-NPR-Z0-9]{7}$'),
  options   text[] not null default '{}',
  note      text check (note is null or char_length(note) <= 2000),

  name      text not null check (char_length(trim(name)) between 2 and 120),
  email     text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone     text check (phone is null or char_length(phone) <= 40),
  -- Zákazník potvrdil vypnutý imobilizér a použití mimo veřejné komunikace.
  ews_ack   boolean not null check (ews_ack),
  locale    text not null default 'cs' check (locale in ('cs', 'en')),

  status    text not null default 'new'
            check (status in ('new', 'quoted', 'paid', 'shipped', 'core_returned', 'closed', 'rejected')),
  internal_note text
);

create index if not exists e46_unit_requests_created_at_idx
  on public.e46_unit_requests (created_at desc);

alter table public.e46_unit_requests enable row level security;

-- Anon smí vložit jen novou poptávku: žádný select, update ani delete
-- a nesmí si sám nastavit stav nebo interní poznámku.
drop policy if exists "anon can submit unit request" on public.e46_unit_requests;
create policy "anon can submit unit request"
  on public.e46_unit_requests
  for insert
  to anon
  with check (status = 'new' and internal_note is null);
