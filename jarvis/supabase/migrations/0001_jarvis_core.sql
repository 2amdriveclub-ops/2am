-- Jarvis — sdílená paměť (Supabase projekt "jarvis")
-- Migrace 0001 · 26. 9. 2026
-- 10 tabulek podle "Jarvis — architektura v1".
-- RLS zapnuté všude: přístup mají jen přihlášení majitelé (tabulka owners).
-- Agenti přes Supabase MCP / service role RLS obcházejí.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------
-- Majitelé (kdo smí do dat přes command center)
-- ---------------------------------------------------------------
create table public.owners (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null check (name in ('Radek', 'Bohuslav')),
  created_at timestamptz not null default now()
);

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.owners where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------
-- 1. projects
-- ---------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  status text not null default 'active'
    check (status in ('active', 'idea', 'building', 'launched', 'earning', 'paused', 'closed')),
  owner text check (owner in ('Radek', 'Bohuslav', 'oba')),
  quarterly_goal_czk numeric(12, 2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- 2. agents
-- ---------------------------------------------------------------
create table public.agents (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  level smallint not null check (level between 1 and 3),
  project_id uuid references public.projects(id) on delete set null,
  parent_agent_id uuid references public.agents(id) on delete set null,
  prompt_path text,
  prompt_version text,
  daily_budget_usd numeric(8, 2) not null default 0,
  status text not null default 'active'
    check (status in ('active', 'paused', 'retired')),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  -- L3 musí mít rodiče a expiraci; L1 rodiče nemá
  constraint l3_needs_parent check (level <> 3 or (parent_agent_id is not null and expires_at is not null)),
  constraint l1_no_parent check (level <> 1 or parent_agent_id is null)
);

-- L3 nesmí tvořit další agenty: rodič L3 agenta musí být L2
create or replace function public.check_agent_parent()
returns trigger
language plpgsql
as $$
declare parent_level smallint;
begin
  if new.parent_agent_id is null then
    return new;
  end if;
  select level into parent_level from public.agents where id = new.parent_agent_id;
  if parent_level is null or parent_level >= new.level then
    raise exception 'Rodič agenta musí být o úroveň výš (L1 → L2 → L3). L3 nesmí tvořit agenty.';
  end if;
  return new;
end;
$$;

create trigger agents_parent_check
before insert or update of parent_agent_id, level on public.agents
for each row execute function public.check_agent_parent();

-- Max 3 aktivní L3 agenti na projekt
create or replace function public.check_l3_limit()
returns trigger
language plpgsql
as $$
begin
  if new.level = 3 and new.status = 'active' and (
    select count(*) from public.agents
    where level = 3 and status = 'active'
      and project_id is not distinct from new.project_id
      and id <> new.id
  ) >= 3 then
    raise exception 'Projekt už má 3 aktivní sub-agenty. Víc jen se schválením Jarvise.';
  end if;
  return new;
end;
$$;

create trigger agents_l3_limit
before insert or update of status, level on public.agents
for each row execute function public.check_l3_limit();

-- ---------------------------------------------------------------
-- 3. tasks
-- ---------------------------------------------------------------
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  detail text,
  owner text not null,              -- 'Radek', 'Bohuslav' nebo název agenta
  priority smallint not null default 3 check (priority between 1 and 5),  -- 1 = nejvyšší
  status text not null default 'todo'
    check (status in ('todo', 'doing', 'blocked', 'done', 'cancelled')),
  due date,
  output text,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tasks_open_idx on public.tasks (status, priority, due) where status not in ('done', 'cancelled');

-- ---------------------------------------------------------------
-- 4. approvals (oranžová zóna semaforu)
-- ---------------------------------------------------------------
create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references public.agents(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  action text not null,
  proposal text not null,
  impact_czk numeric(12, 2),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'changes_requested')),
  -- nad 5 000 Kč musí schválit oba
  needs_both boolean generated always as (coalesce(impact_czk, 0) > 5000) stored,
  approved_by text[] not null default '{}',
  decided_at timestamptz,
  comment text,
  created_at timestamptz not null default now()
);

create index approvals_pending_idx on public.approvals (created_at) where status = 'pending';

-- ---------------------------------------------------------------
-- 5. decisions
-- ---------------------------------------------------------------
create table public.decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  decision text not null,
  reason text,
  decided_by text not null,
  decided_on date not null default current_date,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- 6. rejected
-- ---------------------------------------------------------------
create table public.rejected (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  idea text not null,
  reason text not null,
  rejected_on date not null default current_date,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- 7. metrics
-- ---------------------------------------------------------------
create table public.metrics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  metric text not null,              -- např. revenue_czk, costs_czk, paying_users
  value numeric(14, 2) not null,
  period_start date not null,
  period_end date not null,
  source text not null,              -- odkud číslo je (soubor, tabulka, App Store…)
  created_at timestamptz not null default now(),
  check (period_end >= period_start)
);

create index metrics_lookup_idx on public.metrics (metric, period_start);

-- ---------------------------------------------------------------
-- 8. runs (každý běh agenta)
-- ---------------------------------------------------------------
create table public.runs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references public.agents(id) on delete set null,
  trigger text not null,             -- morning-brief, queue, manual…
  summary text,
  tokens integer,
  cost_usd numeric(10, 4),
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create index runs_cost_idx on public.runs (started_at);

-- ---------------------------------------------------------------
-- 9. opportunities
-- ---------------------------------------------------------------
create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  source_agent text not null,
  idea text not null,
  est_revenue_czk numeric(12, 2),    -- vždy odhad
  est_effort_hours numeric(6, 1),
  evidence text,                     -- na čem odhad stojí
  status text not null default 'new'
    check (status in ('new', 'proposed', 'approved', 'rejected', 'done')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- 10. context (trvalé znalosti per projekt)
-- ---------------------------------------------------------------
create table public.context (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,  -- null = celá firma
  key text not null,
  value text not null,
  stated_by text not null,           -- Radek / Bohuslav / data:<zdroj>
  updated_at timestamptz not null default now(),
  unique (project_id, key)
);

-- ---------------------------------------------------------------
-- updated_at automaticky
-- ---------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_touch before update on public.projects for each row execute function public.touch_updated_at();
create trigger tasks_touch before update on public.tasks for each row execute function public.touch_updated_at();
create trigger context_touch before update on public.context for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------
-- RLS: jen majitelé
-- ---------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'owners', 'projects', 'agents', 'tasks', 'approvals', 'decisions',
    'rejected', 'metrics', 'runs', 'opportunities', 'context'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.is_owner()) with check (public.is_owner())',
      t || '_owners_only', t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------
-- Počáteční data (jen fakta z 26. 9. 2026)
-- ---------------------------------------------------------------
insert into public.projects (slug, name, status, owner, quarterly_goal_czk, notes) values
  ('firma',     '2AM Drive Club (firma)', 'active',   'oba',   1000000, 'Cíl Q4 2026: 1 000 000 Kč tržeb (rozhodnuto 26. 9. 2026)'),
  ('obskura',   'Obskura',                'building', 'Radek', null,    'Appka hotová, submit na App Store review tento týden; freemium + 10–20 €/měs.; zatím 0 platících'),
  ('torqly',    'Torqly',                 'launched', null,    null,    'iOS appka, spuštěná, nevydělává; backend v jiném Supabase účtu'),
  ('driveclub', '2AM Drive Club klub',    'active',   null,    null,    'Klub + web 2am-drive-club.vercel.app'),
  ('atelier',   'Ateliér Jesenice',       'building', null,    null,    'Rekonstrukce probíhá; vlastní prostory bez nájmu')
on conflict (slug) do nothing;

insert into public.agents (name, level, prompt_path, prompt_version, daily_budget_usd) values
  ('Jarvis', 1, 'prompts/jarvis.md', 'v1', 1.50)
on conflict (name) do nothing;

insert into public.decisions (project_id, decision, reason, decided_by, decided_on)
select p.id, d.decision, d.reason, d.decided_by, d.decided_on::date
from (values
  ('firma',   'Mozek Jarvise je Claude',                                        'Tým zůstává u Claude, Grok zamítnut',                'Radek', '2026-09-26'),
  ('firma',   'Volání přes klasický telefon na volnou SIM (Telnyx/Twilio + ElevenLabs)', 'WhatsApp Business API je pro interní použití zbytečná byrokracie', 'Radek', '2026-09-26'),
  ('firma',   'Hierarchie agentů L0–L3 a vlastní command center místo Slacku',  'Chtějí projekty a tabuli na jednom místě',            'Radek', '2026-09-26'),
  ('firma',   'Kvartální cíl Q4 2026: 1 000 000 Kč tržeb',                       null,                                                 'Radek', '2026-09-26'),
  ('firma',   'Rozpočet na provoz agentů 2 000–5 000 Kč měsíčně, start na 2 000 Kč', null,                                           'Radek', '2026-09-26'),
  ('firma',   'Semafor autonomie schválen, limit 5 000 Kč pro jednoho schvalujícího', null,                                          'Radek', '2026-09-26'),
  ('firma',   'Běh: Claude Code na nonstop PC + appka Claude, sdílená paměť v repu jarvis a Supabase', 'Appka pro rozhovory a mobil, Claude Code pro nonstop smyčky', 'Radek', '2026-09-26'),
  ('obskura', 'Model: freemium + placená verze 10–20 €/měs.',                   'Přesná cena otevřená',                               'Radek', '2026-09-26')
) as d(slug, decision, reason, decided_by, decided_on)
join public.projects p on p.slug = d.slug;

insert into public.rejected (project_id, idea, reason, rejected_on)
select p.id, r.idea, r.reason, r.rejected_on::date
from (values
  ('firma',   'Grok jako mozek Jarvise',                         'Tým zůstává u Claude',                                     '2026-09-26'),
  ('firma',   'Volání přes WhatsApp Business API',               'Ověření u Mety a postupné zavádění, zbytečné pro 2 lidi',  '2026-09-26'),
  ('firma',   'Slack jako hlavní rozhraní',                      'Chtějí vlastní command center',                            '2026-09-26'),
  ('firma',   'Generický stock, marketplace, obsahové předplatné jako hlavní byznys', 'Zamítnuto v brainstormingu',        '2026-09-09'),
  ('obskura', 'Pětidenní expirace full-res fotek',               'Egress u Cloudflare R2 je zdarma',                         '2026-09-10')
) as r(slug, idea, reason, rejected_on)
join public.projects p on p.slug = r.slug;

insert into public.tasks (project_id, title, owner, priority, due, created_by)
select p.id, t.title, t.owner, t.priority, t.due::date, 'Jarvis'
from (values
  ('obskura', 'Submit Obskury na App Store review',                                   'Radek',    1, '2026-10-02'),
  ('firma',   'Bankovní výpisy a faktury za 12 měsíců do Google Disku / Finance',      'Radek',    1, '2026-10-04'),
  ('firma',   'Bankovní výpisy a faktury za 12 měsíců do Google Disku / Finance',      'Bohuslav', 1, '2026-10-04'),
  ('torqly',  'Pozvat 2amdriveclub@gmail.com do Supabase organizace Torqly',          'Radek',    2, '2026-10-04'),
  ('firma',   'Vyplnit onboarding dotazník (čas, klienti, prodej, sítě, cíl)',        'Bohuslav', 2, '2026-10-04'),
  ('firma',   'CFO-001: cesta k 1 000 000 Kč v Q4 (do 7 dní od dodání dat)',          'Jarvis',   1, null)
) as t(slug, title, owner, priority, due)
join public.projects p on p.slug = t.slug;
