import { getAnalyticsForUrls } from "@/services/clicks";
import { getUrls } from "@/services/urls";
import React from "react";

const DashboardPage = async () => {
  const urls = await getUrls();
  const clicks = await getAnalyticsForUrls(urls.map((url) => url.id));

  console.log({ urls, clicks });

  return <section className="flex-1">DashboardPage</section>;
};

export default DashboardPage;
