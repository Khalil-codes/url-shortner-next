import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.from("urls").select("*");
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Hello World</h1>
    </main>
  );
}
