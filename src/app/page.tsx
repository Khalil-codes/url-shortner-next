import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { LinkIcon } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.from("urls").select("*");
  console.log(data);
  return (
    <main className="container flex flex-1 items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-muted-foreground">
            Shorten your long URLs and track their performance.
          </p>
        </div>
        <div className="relative">
          <div className="flex items-center overflow-hidden rounded-full bg-muted">
            <LinkIcon className="absolute left-4 h-5 w-5" />
            <Input
              type="url"
              placeholder="Enter your loooong URL"
              className="flex-grow border-none bg-transparent py-6 pl-12 pr-28 focus:outline-none focus:ring-0"
            />
            <Button className="absolute right-2 rounded-full">Shorten!</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
