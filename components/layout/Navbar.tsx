"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/buttons/Button";
import { navLinks } from "@/constant/navigations";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Navbar() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<number | null>(null);

  // Mobile submenu toggle
  const toggleMobileSub = (id: number) => {
    setOpenMobileSub(openMobileSub === id ? null : id);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenMobileSub(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nav-border bg-nav-bg backdrop-blur-md transition-colors">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              Blackcrest
              <span className="text-secondary">.</span>
            </span>
            <span className="hidden text-sm font-medium text-body md:inline">
              Advisory
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => {
              const hasChildren = link.children && link.children.length > 0;

              return (
                <div
                  key={link.id}
                  className="relative group"
                  onMouseEnter={() => hasChildren && setOpenDropdown(link.id)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <Link
                    href={link.link}
                    className="flex items-center text-sm font-medium text-body transition-colors hover:text-secondary"
                  >
                    {link.name}
                    {hasChildren && (
                      <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {hasChildren && openDropdown === link.id && (
                    <div className="absolute left-0 mt-2 w-56 rounded-md bg-popover shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                      <div className="py-1">
                        {link.children!.map((child) => (
                          <Link
                            key={child.id}
                            href={child.link}
                            className="block px-4 py-2 text-sm text-body transition-colors hover:bg-muted hover:text-secondary"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Desktop right side - Theme toggle & CTA */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-body hover:bg-muted"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
            >
              <div className="space-y-1 pb-4 pt-2">
                {navLinks.map((link) => {
                  const hasChildren = link.children && link.children.length > 0;

                  return (
                    <div key={link.id} className="space-y-1">
                      {/* Mobile nav item */}
                      <div className="flex items-center justify-between px-3 py-2">
                        <Link
                          href={link.link}
                          className="text-base font-medium text-body transition-colors hover:text-secondary"
                          onClick={closeMobileMenu}
                        >
                          {link.name}
                        </Link>
                        {hasChildren && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleMobileSub(link.id);
                            }}
                            className="rounded p-1 text-body hover:bg-muted"
                            aria-label="Toggle submenu"
                          >
                            <ChevronDownIcon
                              className={`h-5 w-5 transition-transform duration-200 ${
                                openMobileSub === link.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile submenu */}
                      {hasChildren && openMobileSub === link.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 space-y-1 border-l-2 border-muted pl-2"
                        >
                          {link.children!.map((child) => (
                            <Link
                              key={child.id}
                              href={child.link}
                              className="block px-3 py-2 text-sm text-body transition-colors hover:text-secondary"
                              onClick={closeMobileMenu}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                {/* Mobile CTA */}
                <div className="px-3 pt-4">
                  <Button variant="primary" size="md" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

// Icons
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
