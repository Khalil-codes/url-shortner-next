"use server";

import type { FormData } from "@/components/login";
import type { SignupSchema } from "@/components/signup";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signInWithEmail = async (
  data: FormData,
  params?: { next?: string }
) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  const { next } = params || {};
  redirect(next ? next : "/dashboard");
};

export const signUpWithEmail = async (
  data: SignupSchema,
  params?: { next?: string }
) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  const { next } = params || {};
  redirect(next ? next : "/dashboard");
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/auth?screen=login");
};
