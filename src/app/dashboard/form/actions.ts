"use server";

import { createClient } from "@/lib/supabase/server";
import { URLFormType } from "./_components/form";
import { buildFullUrl } from "@/lib/utils";
import { toBuffer } from "qrcode";
import { redirect } from "next/navigation";

export const createUrl = async (data: URLFormType) => {
  const link = Math.random().toString(36).substring(2, 8);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const short_url = buildFullUrl(data.custom || link);
  const buffer = short_url
    ? await toBuffer(short_url, { margin: 1, width: 400, scale: 2 })
    : null;

  const qr = `qr-${link}-${new Date().getTime()}.png`;

  if (buffer) {
    const { error } = await supabase.storage
      .from("qr-codes")
      .upload(qr, buffer, {
        upsert: true,
      });
    if (error) {
      console.log(error);
      return {
        error: error.message,
      };
    }
  }

  const { error } = await supabase.from("urls").insert({
    title: data.title,
    original_url: data.long_url,
    shortened_url: link,
    alias: data.custom || null,
    user_id: user?.id,
    qr: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/qr-codes/${qr}`,
  });

  if (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }

  redirect(`/dashboard/${link}`);
};
