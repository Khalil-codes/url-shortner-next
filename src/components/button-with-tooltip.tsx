import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button, ButtonProps } from "./ui/button";
import { TooltipProps } from "@radix-ui/react-tooltip";

type Props = {
  children: React.ReactNode;
  tooltipContent?: React.ReactNode;
} & ButtonProps;

const ButtonWithTooltip = ({ children, tooltipContent, ...button }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...button}>{children}</Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
};

export default ButtonWithTooltip;
