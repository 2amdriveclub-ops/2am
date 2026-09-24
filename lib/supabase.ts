import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Klient pro zápis přihlášek. Používá se jen na serveru (route handler),
 * takže anon klíč nikdy neopouští backend a zápis navíc hlídá RLS policy
 * v supabase/migrations/0001_applications.sql.
 *
 * Vrací null, když projekt ještě není nakonfigurovaný — web tím pádem
 * funguje i bez Supabase a formulář poctivě řekne, že příjem nejede.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
