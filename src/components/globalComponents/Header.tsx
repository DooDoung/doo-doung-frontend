"use client";

import { useState } from "react";
import {
  AlignJustify,
  Flag,
  Home,
  Search,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

// ------------------- Data -------------------

const customerLinks = [
  { href: "/", label: "Home", icon: <Home size={24} /> },
  { href: "/course/my-session", label: "Courses", icon: <Search size={24} /> },
  { href: "/booking", label: "Booking", icon: <ShoppingCart size={24} /> },
  { href: "/account", label: "Account", icon: <User size={24} /> },
  { href: "/review", label: "Review", icon: <Star size={24} /> },
  { href: "/report", label: "Report", icon: <Flag size={24} /> },
];

const prophetLinks = [
  { href: "/", label: "Home", icon: <Home size={24} /> },
  { href: "/course/prophet", label: "Courses", icon: <Search size={24} /> },
  { href: "/booking", label: "Booking", icon: <ShoppingCart size={24} /> },
  { href: "/account", label: "Account", icon: <User size={24} /> },
];

// ------------------- Props -------------------

interface HeaderProps {
  className?: string;
  role?: "customer" | "prophet";
}

// ------------------- Component -------------------

export function Header({ className, role = "customer" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const links = role === "customer" ? customerLinks : prophetLinks;

  return (
    <header className={cn("fixed top-5 right-5 z-50", className)}>
      <div
        className={cn(
          "relative flex w-[68px] flex-col items-center gap-4 px-3 py-4 transition-all duration-300 ease-in-out",
          "rounded-[25px] bg-[rgba(62,55,83,0.5)] shadow-[0_0_15px_0_#FFF] backdrop-blur-[2px]",
          isOpen && "gap-6 py-6",
        )}
      >
        {/* --- Hamburger Menu Button --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative cursor-pointer"
        >
          <AlignJustify
            size={28}
            className={cn(
              "text-white transition-transform duration-300 ease-in-out hover:scale-110",
              isOpen && "rotate-180 transform",
            )}
          />
        </button>

        {isOpen && (
          <nav className="flex flex-col items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary-300 flex cursor-pointer flex-col items-center gap-1 text-white transition-colors hover:scale-110"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
