import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 rounded-md border-2 transition-colors duration-200",
        "bg-surface text-primary placeholder-gray-400",
        "border-gray-200 focus:border-accent focus:outline-none",
        error && "border-error focus:border-error",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;