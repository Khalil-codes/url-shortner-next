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
import { signInWithEmail } from "@/app/auth/action";
import { useParams } from "next/navigation";
import { toast } from "./ui/use-toast";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const DEFAULT_VALUES: LoginSchema = {
  email: "",
  password: "",
};

const Login = () => {
  const params = useParams<{ next?: string }>();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const {
    formState: { isSubmitting },
    control,
    reset,
  } = form;

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    const response = await signInWithEmail(data, {
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
      description: "Login successful",
      title: "Success",
      variant: "default",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
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
            {/* <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="arya@stark.com"
                required
              />
            </div> */}
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
            {/* <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="* * * * * * * *"
                required
              />
            </div> */}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default Login;
