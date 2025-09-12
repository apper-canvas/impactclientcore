import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-gradient-to-r from-success to-success/90 text-white",
    warning: "bg-gradient-to-r from-warning to-warning/90 text-white",
    error: "bg-gradient-to-r from-error to-error/90 text-white",
    info: "bg-gradient-to-r from-info to-info/90 text-white",
    accent: "bg-gradient-to-r from-accent to-accent/90 text-white",
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;