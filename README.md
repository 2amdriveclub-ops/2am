# 2AM Drive Club — web

Veřejný web klubu. Next.js 15 (App Router) + Supabase, nasazení na Vercel.

- Definice značky, rozhodnutí a otevřené body: [`docs/definice.md`](docs/definice.md)

## Spuštění

```bash
npm install
cp .env.example .env.local   # vyplnit Supabase údaje
npm run dev                  # http://localhost:3000
```

Bez Supabase web normálně běží, jen formulář přihlášky poctivě hlásí,
že příjem není napojený.

## Kde se co mění

| Chci změnit | Soubor |
|---|---|
| Texty, pilíře klubu, kroky, FAQ, E46 | `lib/site.ts` |
| Odkaz ke stažení E46 Garage | `lib/site.ts` → `e46.downloads` |
| Barvy, typografie, rozestupy | `app/globals.css` (tokeny nahoře) |
| Domovskou stránku | `app/page.tsx` |
| Formulář a validaci | `components/ApplicationForm.tsx`, `app/api/prihlaska/route.ts` |
| Fotky v galerii | `app/page.tsx`, sekce `#galerie` — nahradit `<span>` za `<img>` |

## Supabase

Migraci z `supabase/migrations/0001_applications.sql` pusť v SQL editoru.
Vytvoří tabulku `applications` a RLS policy, která anonymnímu klientovi
povolí **jen zápis** — přihlášky nikdo zvenčí nepřečte.

Přihlášky se pak čtou v Supabase dashboardu (tabulka `applications`,
sloupec `status`: `pending` / `approved` / `rejected`).

## Nasazení

Vercel → import repa → env proměnné z `.env.example` → deploy.

## Skripty

```bash
npm run dev        # vývoj
npm run build      # produkční build
npm run typecheck  # kontrola typů
```
