import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildFullUrl } from "@/lib/utils";
import { getUrlbySlug } from "@/services/urls";

type Props = {
  params: {
    slug: string;
  };
};

const LinkDetail = async ({ params }: Props) => {
  const { slug } = params;

  const { url, clicks = [] } = await getUrlbySlug(slug);

  if (!url) {
    return notFound();
  }

  //   const clickData = clicks.reduce((acc, click) => {
  //     const date = format
  //   }, {})

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8">
      <h1 className="text-3xl font-bold">Link Statistics</h1>
      <Card>
        <CardHeader>
          <CardTitle>{url.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Short URL</p>
              <p className="text-sm text-muted-foreground">
                <Link
                  href={url.shortened_url!}
                  target="_blank"
                  className="underline-offset-2 hover:text-blue-400 hover:underline">
                  {buildFullUrl(url.shortened_url)}
                </Link>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Original URL</p>
              <p className="truncate text-sm text-muted-foreground">
                <Link
                  href={url.original_url!}
                  target="_blank"
                  className="underline-offset-2 hover:text-blue-400 hover:underline">
                  {url.original_url}
                </Link>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Total Clicks</p>
              <p className="text-sm text-muted-foreground">
                {url.clicks_count}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Created At</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(url.created_at || ""), "dd-MM-yyyy")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default LinkDetail;
