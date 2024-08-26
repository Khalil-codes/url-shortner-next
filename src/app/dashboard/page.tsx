import React from "react";
import { getOverallAnalytics } from "@/services/clicks";
import { getUrls } from "@/services/urls";
import { BarChart2, Users } from "lucide-react";
import MetricCard from "./metric-card";
import URLForm from "./url-form";
import RecentLinks from "./recents";

const DashboardPage = async () => {
  const urls = await getUrls();
  const { new_visitors_count, total_clicks } = await getOverallAnalytics();

  const metrics = [
    {
      title: "Total Clicks",
      value: total_clicks.toString(),
      icon: <BarChart2 />,
      color: "bg-green-500",
    },
    // {
    //   title: "Active Links",
    //   value: "42",
    //   icon: <LinkIcon />,
    //   color: "bg-blue-500",
    // },
    {
      title: "New Visitors",
      value: new_visitors_count.toString(),
      icon: <Users />,
      color: "bg-purple-500",
    },
  ];

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8">
      <h1 className="text-center text-4xl font-bold">Your URL Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {metrics.map((metric, index) => (
          <MetricCard index={index} key={metric.title} metric={metric} />
        ))}
      </div>
      <URLForm />
      <div className="grid gap-6">
        {urls.map((url, index) => (
          <RecentLinks key={url.id} link={url} index={index} />
        ))}
      </div>
    </main>
  );
};

export default DashboardPage;
