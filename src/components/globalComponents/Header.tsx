"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

/**
 * Global Header Component
 *
 * Features:
 * - DooDoung brand logo/text on the left
 * - Navigation links on the right (/course, /account, /review)
 * - Responsive design with mobile menu
 * - Clean and modern styling
 */
export function Header({ className }: HeaderProps) {
  const navigationLinks = [
    { href: "/course", label: "Course" },
    { href: "/account", label: "Account" },
    { href: "/review", label: "Review" },
  ];

  return (
    <header
      className={cn(
        "border-border/40 sticky top-0 z-50 mb-5 flex w-full items-center border-b px-10 backdrop-blur",
        className,
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo/Brand */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden text-xl font-bold sm:inline-block">
              DooDoung
            </span>
          </Link>
        </div>

        {/* Mobile Logo */}
        <div className="mr-4 flex md:hidden">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">DooDoung</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/60 hover:text-foreground/80 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex gap-4 md:hidden">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/60 hover:text-foreground/80 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
