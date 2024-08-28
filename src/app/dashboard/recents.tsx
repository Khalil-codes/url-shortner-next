"use client";

import React from "react";
import { motion } from "framer-motion";
import { URLWithClickCount } from "@/types/custom";
import UrlCard from "@/components/url-card";

type Props = {
  link: URLWithClickCount;
  index: number;
};

const RecentLinks = ({ link, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}>
      <UrlCard link={link} />
    </motion.div>
  );
};

export default RecentLinks;
