import { createClient } from "@/lib/supabase/server";

export const getAnalyticsForUrls = async (urlIds: string[]) => {
  const supabase = createClient();

  const { data: clicks, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const clicksMap = new Map<string, typeof clicks>();

  clicks?.forEach((click) => {
    if (!click.url_id) return;
    clicksMap.set(
      click.url_id,
      clicksMap.get(click.url_id)
        ? [...clicksMap.get(click.url_id)!, click]
        : [click]
    );
  });

  return Object.fromEntries(clicksMap.entries());
};
