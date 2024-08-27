import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUrlbyId } from "@/services/urls";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Form from "./_components/form";

type Props = {
  searchParams: { id: string; url: string };
};

const URLForm = async ({ searchParams }: Props) => {
  const { id, url: long_url } = searchParams;
  const url = id ? await getUrlbyId(id) : null;

  if (id && !url) {
    return notFound();
  }

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add a new link</CardTitle>
          <CardDescription>Please fill the following form</CardDescription>
        </CardHeader>
        <CardContent>
          <Form url={url || { original_url: long_url }} />
        </CardContent>
      </Card>
      <Link className="flex items-center" href="/dashboard">
        <ArrowLeftIcon className="mr-2 h-6 w-6" />
        Back to Dashboard
      </Link>
    </main>
  );
};

export default URLForm;
