import Link from "next/link";

import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

/**
 * Global Footer Component
 *
 * Features:
 * - Company information and branding
 * - Useful links organized in sections
 * - Social media links
 * - Copyright information
 * - Responsive design
 */
export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { href: "/course", label: "Courses" },
        { href: "/review", label: "Reviews" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Account",
      links: [
        { href: "/account", label: "My Account" },
        { href: "/profile", label: "Profile" },
        { href: "/settings", label: "Settings" },
        { href: "/help", label: "Help" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/faq", label: "FAQ" },
        { href: "/support", label: "Support" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ],
    },
  ];

  const socialLinks = [
    { href: "#", label: "Twitter", icon: "🐦" },
    { href: "#", label: "Facebook", icon: "📘" },
    { href: "#", label: "LinkedIn", icon: "💼" },
    { href: "#", label: "Instagram", icon: "📷" },
  ];

  return (
    <footer
      className={cn("border-border/40 bg-background mt-5 border-t", className)}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <span className="text-xl font-bold">DooDoung</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm text-sm">
              Your trusted platform for discovering and reviewing educational
              courses. Learn, grow, and share your experiences with our
              community.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-border/40 mt-8 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted-foreground text-sm">
              © {currentYear} DooDoung. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
