import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildFullUrl } from "@/lib/utils";
import { getUrlbySlug } from "@/services/urls";
import { getUrlAnalytics } from "@/services/clicks";
import DetailCard from "./_components/detail-card";
import ClickStats from "./_components/click-stats";
import { ArrowLeftIcon, Pencil, QrCodeIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deleteUrl } from "../actions";

type Props = {
  params: {
    slug: string;
  };
};

const LinkDetail = async ({ params }: Props) => {
  const { slug } = params;

  const { url } = await getUrlbySlug(slug);

  if (!url) {
    return notFound();
  }

  const deleteAction = deleteUrl.bind(null, url.id);

  const { device_data, browser_data, total_clicks, dates_data } =
    await getUrlAnalytics(url.id);

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold">{url.title}</h1>
        <p className="text-lg text-muted-foreground">
          <Link
            href={`/${url.alias || url.shortened_url!}`}
            target="_blank"
            className="underline-offset-2 hover:underline">
            {buildFullUrl(url.alias || url.shortened_url)}
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Short URL</p>
                <p className="text-sm text-muted-foreground">
                  <Link
                    href={`/${url.alias || url.shortened_url!}`}
                    target="_blank"
                    className="underline-offset-2 hover:text-blue-400 hover:underline">
                    {buildFullUrl(url.alias || url.shortened_url)}
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
                <p className="text-sm text-muted-foreground">{total_clicks}</p>
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
        <Card className="md:w-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCodeIcon size={24} /> Scan QR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={url.qr!}
              alt={url.title!}
              width={250}
              height={250}
              className="rounded-lg ring-1 ring-offset-1 max-md:w-full"
            />
          </CardContent>
        </Card>
      </div>
      <ClickStats data={dates_data} />
      <div className="grid gap-4 md:grid-cols-2">
        <DetailCard
          title="Device Usage"
          columns={["Device", "Clicks", "Percentage"]}
          data={device_data.map((item) => ({
            value: item.count,
            name: item.device || "Unknown",
            percentage: ((item.count / total_clicks) * 100).toFixed(2),
          }))}
        />
        <DetailCard
          title="Browser Usage"
          columns={["Browser", "Clicks", "Percentage"]}
          data={browser_data.map((item) => ({
            value: item.count,
            name: item.browser || "Unknown",
            percentage: ((item.count / total_clicks) * 100).toFixed(2),
          }))}
        />
      </div>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <Link className="flex items-center" href="/dashboard">
          <ArrowLeftIcon className="mr-2 h-6 w-6" />
          Back to Dashboard
        </Link>
        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/form?id=${url.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Link
            </Link>
          </Button>
          <form
            action={async () => {
              "use server";
              await deleteAction();
              redirect("/dashboard");
            }}>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Link
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LinkDetail;
