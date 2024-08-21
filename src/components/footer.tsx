import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-muted p-6 text-xs text-muted-foreground">
      <div className="container flex items-center justify-center">
        <p>&copy; 2024 URL Shortener</p>
      </div>
    </footer>
  );
};

export default Footer;
