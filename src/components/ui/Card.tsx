import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`
        bg-surface border border-border rounded-lg shadow-sm p-4
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
}