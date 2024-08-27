"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

const URLForm = () => {
  const [url, setUrl] = useState("");
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Shorten a New URL</h2>
        <div className="flex gap-4">
          <Input
            defaultValue={url}
            onBlur={(e) => {
              const valid = e.target.reportValidity();
              if (valid) setUrl(e.target?.value);
            }}
            placeholder="Enter your long URL here"
            type="url"
          />
          <Button
            type="submit"
            className={cn({ "pointer-events-none": !url })}
            disabled={!url}>
            <Link href={{ pathname: "/dashboard/form/", query: { url } }}>
              Shorten
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default URLForm;
