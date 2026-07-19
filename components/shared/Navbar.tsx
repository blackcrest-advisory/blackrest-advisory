"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/constants/publicNavigations";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";

export default function Navbar() {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
          <Link href="/home" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              Blackcrest
              <span className="text-secondary">.</span>
            </span>
            <span className="hidden text-sm font-medium text-body lg:inline">
              Advisory
            </span>
          </Link>

          {/* Desktop Navigation (lg and up) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => {
              const hasChildren = link.children && link.children.length > 0;
              const active = isActive(link.link);

              return (
                <div
                  key={link.id}
                  className="relative group"
                  onMouseEnter={() => hasChildren && setOpenDropdown(link.id)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <Link
                    href={link.link}
                    className={`relative flex items-center text-sm font-medium transition-colors duration-300 hover:text-secondary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 after:ease-out ${active ? "text-secondary after:w-full" : "text-body after:w-0 hover:after:w-full"}`}
                  >
                    {link.name}
                    {hasChildren && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {hasChildren && (
                    <Dropdown isOpen={openDropdown === link.id}>
                      {link.children?.map((child) => (
                        <DropdownItem
                          key={child.id}
                          href={child.link}
                          active={isActive(child.link)}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.name}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}
                </div>
              );
            })}

            {/* Desktop right side - Theme toggle & CTA */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="secondary" size="sm" href="/login">
                Login
              </Button>
              <Button variant="primary" size="sm" href="/select-industry">
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile/Tablet menu button (visible below lg) */}
          <div className="flex items-center lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-body hover:bg-muted"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation (below lg) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="space-y-1 pb-4 pt-2">
                {navLinks.map((link) => {
                  const hasChildren = link.children && link.children.length > 0;
                  const active = isActive(link.link);

                  return (
                    <div key={link.id} className="space-y-1">
                      {/* Mobile nav item */}
                      <div className="flex items-center justify-between px-3 py-2">
                        <Link
                          href={link.link}
                          className={`text-base font-medium transition-colors hover:text-secondary ${
                            active ? "text-secondary" : "text-body"
                          }`}
                          onClick={closeMobileMenu}
                          aria-current={active ? "page" : undefined}
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
                            <ChevronDown
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
                          {link.children!.map((child) => {
                            const childActive = isActive(child.link);
                            return (
                              <Link
                                key={child.id}
                                href={child.link}
                                className={`block px-3 py-2 text-sm transition-colors hover:text-secondary ${
                                  childActive ? "text-secondary" : "text-body"
                                }`}
                                onClick={closeMobileMenu}
                                aria-current={childActive ? "page" : undefined}
                              >
                                {child.name}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                {/* Mobile CTA */}
                <div className="px-3 pt-4 flex flex-col gap-3">
                  <Button
                    variant="primary"
                    className="w-full"
                    href="/select-industry"
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="primary"
                    className="w-full"
                    href="/login"
                    onClick={closeMobileMenu}
                  >
                    Login
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
