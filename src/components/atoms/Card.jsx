import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  children, 
  hoverable = false,
  ...props 
}, ref) => {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg border border-gray-200 shadow-lg backdrop-blur-sm",
        hoverable && "transition-all duration-200 hover:shadow-xl hover:scale-[1.02]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;