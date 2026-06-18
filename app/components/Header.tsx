"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteContact } from "../lib/data";
import Logo from "./Logo";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Problems Solved", href: "/#problems" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brdr bg-white/90 backdrop-blur-md shadow-[0_1px_20px_rgba(16,92,4,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo priority />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteContact.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            Talk to an advisor
          </a>
          <Link
            href="/properties"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
          >
            Browse Land
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 top-16 bg-foreground/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`absolute inset-x-0 top-16 origin-top border-b border-brdr bg-white px-4 pb-6 pt-2 shadow-xl transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-brdr py-3.5 text-base font-medium text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={`tel:${siteContact.phone}`}
              className="flex items-center justify-center gap-2 rounded-full border border-brdr px-5 py-3 text-sm font-semibold text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" />
              Talk to an advisor
            </a>
            <Link
              href="/properties"
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Browse Land
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
