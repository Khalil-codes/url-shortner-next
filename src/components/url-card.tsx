import React from "react";
import { Card, CardContent } from "./ui/card";
import { BarChart2, ExternalLink, Trash2 } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ButtonWithTooltip from "./button-with-tooltip";
import CopyButton from "./copy-button";
import { URLWithClickCount } from "@/types/custom";
import { buildFullUrl } from "@/lib/utils";
import { deleteUrl } from "@/app/dashboard/actions";
import Link from "next/link";

type Props = {
  link: URLWithClickCount;
};

const UrlCard = ({ link }: Props) => {
  const deleteAction = deleteUrl.bind(null, link.id);
  return (
    <Card className="transform overflow-hidden bg-card transition-all duration-300 hover:scale-[1.01]">
      <CardContent className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold sm:text-3xl">
            <Link href={`/dashboard/${link.shortened_url!}`}>{link.title}</Link>
          </h3>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {buildFullUrl(link.alias || link.shortened_url)}
          </p>
          <p className="max-w-[30ch] truncate text-sm text-muted-foreground sm:max-w-md">
            {link.original_url}
          </p>
          <p className="text-sm">
            Clicks:{" "}
            <span className="font-bold text-primary">
              {link.clicks[0].count}
            </span>
          </p>
        </div>
        <TooltipProvider>
          <div className="flex gap-2">
            <ButtonWithTooltip
              variant="outline"
              size="icon"
              asChild
              tooltipContent={<p>Visit Link</p>}>
              <Link
                href={"/" + link.alias || link.shortened_url!}
                target="_blank">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </ButtonWithTooltip>
            <CopyButton text={buildFullUrl(link.alias || link.shortened_url)} />
            <ButtonWithTooltip
              variant="outline"
              size="icon"
              asChild
              tooltipContent={<p>View Analytics</p>}>
              <Link href={`/dashboard/${link.shortened_url!}`}>
                <BarChart2 className="h-4 w-4" />
              </Link>
            </ButtonWithTooltip>
            <form action={deleteAction}>
              <ButtonWithTooltip
                variant="outline"
                size="icon"
                tooltipContent={<p>Delete Link</p>}>
                <Trash2 className="h-4 w-4" />
              </ButtonWithTooltip>
            </form>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default UrlCard;
