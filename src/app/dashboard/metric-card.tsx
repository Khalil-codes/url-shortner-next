"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  index: number;
  metric: {
    title: string;
    value: string;
    icon: JSX.Element;
    color: string;
  };
};

const MetricCard = ({ metric, index }: Props) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}>
      <Card className="overflow-hidden">
        <CardContent className="flex h-48 flex-col items-center justify-center p-6 text-center">
          <div className={`absolute left-0 top-0 h-1 w-full ${metric.color}`} />
          {React.cloneElement(metric.icon, {
            className: "w-12 h-12 mb-4 text-primary",
          })}
          <h2 className="mb-2 text-2xl font-bold">{metric.title}</h2>
          <p className="text-4xl font-bold text-primary">{metric.value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
