"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadcnForm,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { URL } from "@/types/custom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { getBaseUrl } from "@/lib/utils";
import { createUrl } from "../actions";
import { toast } from "@/components/ui/use-toast";

type Props = {
  url: Partial<URL> | null;
};

const URLFormSchema = z.object({
  title: z.string().min(3),
  long_url: z.string().url(),
  custom: z
    .string()
    .min(3, { message: "Custom Link must be at least 3 characters" })
    .optional()
    .refine(async (val) => {
      if (!val) return true;

      const supabase = createClient();
      const { data } = await supabase
        .from("urls")
        .select("id")
        .eq("alias", val);

      if (data) return "Link should be unique";

      return true;
    }),
});

export type URLFormType = z.infer<typeof URLFormSchema>;

const Form = ({ url }: Props) => {
  const form = useForm<URLFormType>({
    resolver: zodResolver(URLFormSchema),
    defaultValues: {
      title: url?.title || "",
      long_url: url?.original_url || "",
      custom: url?.alias || "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValidating },
  } = form;

  const onSubmit: SubmitHandler<URLFormType> = async (data) => {
    const response = await createUrl(data);

    if (response?.error) {
      return toast({
        description: response.error,
        title: "Error",
        variant: "destructive",
      });
    }
    reset({ custom: "", long_url: "", title: "" });
    toast({
      description: "Signup successful",
      title: "Success",
      variant: "default",
    });
  };

  return (
    <ShadcnForm {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My Link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="long_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  {...field}
                  type="url"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="custom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 rounded bg-muted pl-2 text-sm">
                  <span>{getBaseUrl()}</span>
                  <Input
                    placeholder="example"
                    {...field}
                    className="rounded-bl-none rounded-tl-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || isValidating}>
          Create
        </Button>
      </form>
    </ShadcnForm>
  );
};

export default Form;
