"use server";

import type { LoginSchema } from "@/components/login";
import type { SignupSchema } from "@/components/signup";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signInWithEmail = async (
  data: LoginSchema,
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
  formData: FormData,
  params?: { next?: string }
) => {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    profile: formData.get("profile") as File,
  };

  const supabase = createClient();

  const buffer = Buffer.from(await data.profile.arrayBuffer());
  const fileName = `avatar-${data.name.split(" ").join("-").toLowerCase()}-${new Date().getTime()}.${data.profile.name.split(".").pop()}`;
  const { error: avatarError } = await supabase.storage
    .from("profile_picture")
    .upload(fileName, buffer);

  if (avatarError) {
    return { error: avatarError.message };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/profile_picture/${fileName}`,
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
