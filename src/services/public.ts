import { createClient } from "@/lib/supabase/server";
import { headers as nextHeaders } from "next/headers";
import { userAgent as nextUserAgent } from "next/server";
import { getCurrentLocationFromIp } from "./location";

export const getPublicUrlData = async (slug: string) => {
  const supabase = createClient();

  const { data: url, error } = await supabase
    .from("urls")
    .select("*")
    .or(`shortened_url.eq.${slug},alias.eq.${slug}`)
    .single();

  if (error || !url) {
    console.error(error);
    return { url: null };
  }

  const headers = nextHeaders();
  const { device, browser } = nextUserAgent({ headers: headers });

  const _location = await getCurrentLocationFromIp();

  const location =
    _location?.city && _location?.country_name
      ? `${_location.city}, ${_location.country_name}`
      : "Unknown";

  supabase
    .from("clicks")
    .insert({
      url_id: url.id,
      browser: browser.name,
      device: device.type || "desktop",
      location: location,
    })
    .then(async () => {
      supabase.rpc("increment", { row_id: url.id });
    });

  return { url };
};
