"use server";

import { createClient } from "@/lib/supabase/server";

// function to generate 6 character random string
const generateRandomString = (length: number = 6) => {
  var randomChars = "abcdefghijklmnopqrstuvwxyz";
  var result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

export const generateUrl = async (url: string) => {
  const link = generateRandomString();
  console.log(link);
  return;

  const supabase = createClient();
  const { data: urls, error } = await supabase.from("urls").insert({
    title: "Something Something",
    original_url: url,
    shortened_url: generateRandomString(6),
  });
  if (error) {
    throw new Error(error.message);
  }
  return urls;
};

export const deleteUrl = async (urlId: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("urls").delete().eq("id", urlId);
  if (error) {
    throw new Error(error.message);
  }
};
