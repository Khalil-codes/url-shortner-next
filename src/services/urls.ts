import { createClient } from "@/lib/supabase/server";

export async function getUrls() {
  const supabase = createClient();

  const { data: urls, error } = await supabase
    .from("urls")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: total_clicks } = await supabase
    .from("urls")
    .select<string, { sum: number }>("clicks_count.sum()", { count: "exact" });

  if (error) {
    throw new Error(error.message);
  }

  return { urls, total_clicks: total_clicks?.[0].sum || 0 };
}
