"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const URLFormSchema = z.object({
  url: z.string().url(),
});

export type URLFormType = z.infer<typeof URLFormSchema>;

const URLForm = () => {
  const form = useForm<URLFormType>({
    mode: "onChange",
    resolver: zodResolver(URLFormSchema),
    defaultValues: { url: "" },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = form;

  const onSubmit = async (data: URLFormType) => {
    console.log(data);

    // TODO: send data to supabase
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Shorten a New URL</h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
            <FormField
              control={control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter your long URL here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="min-w-[7rem]"
              disabled={isSubmitting}>
              {!isSubmitting ? (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Shorten
                </>
              ) : (
                <>
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default URLForm;
