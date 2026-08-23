import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StrokeTextProps {
  children: ReactNode;
  className?: string;
}

export function StrokeText({ children, className }: StrokeTextProps) {
  return (
    <span className={cn("text-stroke", className)}>
      {children}
    </span>
  );
}
