import { createClient } from "@/lib/supabase/server";

export const getAnalyticsForUrls = async (urlIds: string[]) => {
  const supabase = createClient();

  // Get Clicks
  const { data: clicks, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds)
    .order("created_at", { ascending: false });

  // Get Total Clicks
  const { data: total_clicks } = await supabase
    .from("urls")
    .select<string, { sum: number }>("clicks_count.sum()", { count: "exact" });

  // Get New Visitors in the last 24 hours
  const { count: new_visitors_count } = await supabase
    .from("clicks")
    .select<string>("id.count()", {
      count: "exact",
    })
    .gte(
      "created_at",
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    );

  if (error) {
    throw new Error(error.message);
  }

  // Group Clicks
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

  return {
    clicks: Object.fromEntries(clicksMap.entries()),
    total_clicks: total_clicks?.[0].sum || 0,
    new_visitors_count: new_visitors_count || 0,
  };
};
