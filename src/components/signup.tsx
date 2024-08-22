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

export const signupSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  password: z.string().trim().min(6),
});

export type SignupSchema = z.infer<typeof signupSchema>;

const Signup = () => {
  const params = useParams<{ next?: string }>();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const {
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit = async (data: SignupSchema) => {
    console.log(data);
    const response = await signUpWithEmail(data, {
      next: params?.next,
    });

    if (response?.error) {
      return toast({
        description: response.error,
        title: "Error",
        variant: "destructive",
      });
    }

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
                  <FormLabel>Yorur name</FormLabel>
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
