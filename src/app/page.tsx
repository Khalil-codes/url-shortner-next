// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChartIcon, ShieldCheckIcon, SmartphoneIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none">
                Shorten Your Links, Expand Your Reach
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
                Create short, memorable links in seconds. Track clicks, analyze
                user data, and boost your online presence.
              </p>
            </div>
            <Button asChild>
              <Link href="/auth?screen=login">Get Started</Link>
            </Button>
            {/* <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input placeholder="Enter your looong URL" type="url" />
                <Button type="submit">Shorten</Button>
              </form>
            </div> */}
          </div>
        </div>
      </section>
      <hr className="container mx-auto my-2" />
      <section className="w-full bg-white/50 py-12 backdrop-blur-sm dark:bg-transparent dark:backdrop-blur-none md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
              <BarChartIcon className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Detailed Analytics</h2>
              <p className="text-center text-gray-700 dark:text-gray-300">
                Track clicks, user agents, and more with our comprehensive
                analytics dashboard.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
              <ShieldCheckIcon className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Secure & Reliable</h2>
              <p className="text-center text-gray-700 dark:text-gray-300">
                Your links are safe with us. We use industry-standard security
                measures to protect your data.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
              <SmartphoneIcon className="h-10 w-10 text-primary" />
              <h2 className="text-xl font-bold">Mobile Friendly</h2>
              <p className="text-center text-gray-700 dark:text-gray-300">
                Access your shortened links and analytics on any device,
                anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
