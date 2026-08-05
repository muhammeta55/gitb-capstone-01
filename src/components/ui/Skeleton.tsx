import { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", ...rest }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-border rounded-md ${className}`}
      {...rest}
    />
  );
}