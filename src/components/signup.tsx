"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpWithEmail } from "@/app/auth/action";
import { useParams } from "next/navigation";
import { toast } from "./ui/use-toast";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const signupSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  password: z.string().trim().min(6),
  profile: z
    .any()
    .refine((file) => file.size !== 0, "Please upload an image")
    .refine(
      (files: File[]) => {
        return Array.from(files).every((file) => file instanceof File);
      },
      { message: "Expected a file" }
    )
    .refine(
      (files: File[]) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png and .webp"
    ),
});

export type SignupSchema = z.infer<typeof signupSchema>;

const DEFAULT_VALUES: SignupSchema = {
  name: "",
  email: "",
  password: "",
  profile: undefined,
};

const Signup = () => {
  const params = useParams<{ next?: string }>();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const {
    formState: { isSubmitting },
    control,
    reset,
  } = form;

  const onSubmit = async (data: SignupSchema) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile", data.profile[0]);

    const response = await signUpWithEmail(formData, {
      next: params?.next,
    });

    if (response?.error) {
      return toast({
        description: response.error,
        title: "Error",
        variant: "destructive",
      });
    }
    reset();
    toast({
      description: "Signup successful",
      title: "Success",
      variant: "default",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Please register with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your name</FormLabel>
                  <FormControl>
                    <Input placeholder="Arya Stark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="arya@stark.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="* * * * * * * *"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your profile picture</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...field}
                      value={undefined}
                      onChange={(event) => {
                        if (event.target.files) {
                          field.onChange(event.target.files);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              Signup
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Signup;
