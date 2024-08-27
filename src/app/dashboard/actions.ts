"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteUrl = async (urlId: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("urls").delete().eq("id", urlId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/dashboard");
};
