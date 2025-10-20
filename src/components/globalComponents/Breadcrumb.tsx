import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
};

export default function Breadcrumb({ items, className, separator = <ChevronRight size={16} className="text-neutral-400" /> }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <nav className={cn("text-sm text-neutral-600", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center">
              {it.href && !isLast ? (
                <Link href={it.href} className="text-primary-600 hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span className={cn(isLast ? "text-neutral-900 font-medium" : "text-neutral-600")}>{it.label}</span>
              )}

              {!isLast && (
                <span className="mx-2 text-neutral-400" aria-hidden>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
