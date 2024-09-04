import { createClient } from "@/lib/supabase/server";
import { URL, URLWithClickCount } from "@/types/custom";

export async function getUrls() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: urls, error } = await supabase
    .from("urls")
    .select<string, URLWithClickCount>("*,clicks(id.count())")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return urls;
}

export const getUrlbySlug = async (slug: string) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { url: null };
  }

  const { data: url, error } = await supabase
    .from("urls")
    .select("*")
    .eq("shortened_url", slug)
    .eq("user_id", user.id)
    .single();

  if (error || !url) {
    console.error(error);
    return { url: null };
  }

  const { data: clicks } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url.id)
    .order("created_at", { ascending: false });

  return { url, clicks: clicks || [] };
};

export const getUrlbyId = async (id: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: url, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !url) {
    console.error(error);
    return null;
  }

  return url;
};
