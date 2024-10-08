import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Login from "@/components/login";
import Signup from "@/components/signup";
import { Metadata } from "next";

export function generateMetadata({ searchParams }: Props): Metadata {
  const { screen = "login" } = searchParams;
  return {
    title: `${screen === "login" ? "Login" : "Signup"} | Shinkkit`,
  };
}

type Props = {
  searchParams: { screen: "login" | "signup" };
};

const AuthPage = ({ searchParams }: Props) => {
  const { screen = "login" } = searchParams;
  return (
    <main className="container flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <Tabs defaultValue={screen} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" asChild>
            <Link
              href={"/auth?screen=login"}
              prefetch={false}
              shallow
              scroll={false}>
              Login
            </Link>
          </TabsTrigger>
          <TabsTrigger value="signup" asChild>
            <Link
              href={"/auth?screen=signup"}
              prefetch={false}
              shallow
              scroll={false}>
              Signup
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AuthPage;
