import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center">
      <Loader size={50} className="animate-spin" />
      <p>Please wait while we redirect you to the link</p>
    </main>
  );
};

export default Loading;
