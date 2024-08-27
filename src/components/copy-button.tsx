import React, { useState } from "react";
import { Tooltip, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import ButtonWithTooltip from "./button-with-tooltip";

type Props = {
  text: string | null;
};

const CopyButton = ({ text }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (shortUrl: string | null) => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <ButtonWithTooltip
      variant="outline"
      size="icon"
      className="relative overflow-hidden"
      onClick={() => handleCopy(text)}
      tooltipContent={<p>{isCopied ? "Copied!" : "Copy Link"}</p>}>
      <AnimatePresence>
        {isCopied ? (
          <motion.div
            key="check"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            exit={{ y: 30 }}>
            <Check className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            exit={{ y: -30 }}>
            <Copy className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform" />
          </motion.div>
        )}
      </AnimatePresence>
    </ButtonWithTooltip>
  );
};

export default CopyButton;
