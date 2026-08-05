import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bootcamps", label: "Bootcamps" },
  { href: "/schedule", label: "Schedule" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl text-text">
          GITBootcamp
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Placeholder language switcher — wired for real in B-01 */}
          <button className="text-sm text-text border border-border rounded-md px-2 py-1">
            EN
          </button>

          {/* Placeholder theme toggle — wired for real in B-02 */}
          <button className="text-sm text-text border border-border rounded-md px-2 py-1">
            🌙
          </button>

          <Button size="sm">Sign Up</Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}