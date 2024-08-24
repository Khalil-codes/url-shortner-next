import { createClient } from "@/lib/supabase/server";

export async function getUrls() {
  const supabase = createClient();

  const { data: urls, error } = await supabase
    .from("urls")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return urls;
}
