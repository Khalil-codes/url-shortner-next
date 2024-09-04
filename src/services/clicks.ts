import { getDates } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/server";
import { startOfDay, sub } from "date-fns";

export const getOverallAnalytics = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {};
  }

  // Get Total Clicks
  const { count: total_clicks } = await supabase
    .from("clicks")
    .select("id.count(), urls(user_id)", {
      count: "exact",
    })
    .eq("urls.user_id", user.id)
    .not("urls", "is", null);

  // Get New Visitors in the last 24 hours
  const { count: new_visitors_count } = await supabase
    .from("clicks")
    .select("id.count(), urls(user_id)", {
      count: "exact",
    })
    .eq("urls.user_id", user.id)
    .not("urls", "is", null)
    .gte(
      "created_at",
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    );

  return {
    total_clicks: total_clicks || 0,
    new_visitors_count: new_visitors_count || 0,
  };
};

export const getUrlAnalytics = async (urlId: string) => {
  const supabase = createClient();

  // Total Count
  const { count } = await supabase
    .from("clicks")
    .select("id.count()", { count: "exact" })
    .eq("url_id", urlId);

  // Get Device Data
  const { data: device_data } = await supabase
    .from("clicks")
    .select("device, id.count()", { count: "exact" })
    .eq("url_id", urlId);

  // Get Browser Data
  const { data: browser_data } = await supabase
    .from("clicks")
    .select("browser, id.count()", { count: "exact" })
    .eq("url_id", urlId);

  // Get Date Based Clicks for past 7 days
  const { data: dates_data } = await supabase
    .from("clicks")
    .select("clicked_at:created_at::date, id.count()")
    .eq("url_id", urlId)
    .gte("created_at", startOfDay(sub(new Date(), { days: 6 })).toISOString());

  return {
    device_data: device_data || [],
    browser_data: browser_data || [],
    dates_data: getDates(
      dates_data?.map((d) => ({ date: d.clicked_at, clicks: d.count }))
    ),
    total_clicks: count || 0,
  };
};
