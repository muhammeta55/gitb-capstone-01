import { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "primary" | "success" | "warning" | "error" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary text-background",
  success: "bg-success text-background",
  warning: "bg-warning text-background",
  error: "bg-error text-background",
  muted: "bg-muted text-background",
};

export function Badge({ variant = "primary", children, className = "", ...rest }: BadgeProps) {
  return (
    <span
      className={`
        inline-block text-xs font-medium px-2 py-1 rounded-full
        ${variantClasses[variant]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </span>
  );
}