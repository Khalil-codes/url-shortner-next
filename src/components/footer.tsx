import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full items-center border-t bg-white/50 px-4 py-6 backdrop-blur-sm dark:bg-gray-800/50 md:px-6">
      <p className="container mx-auto text-xs text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} ShrinkIt | All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
