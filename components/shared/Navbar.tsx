"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import ThemeToggle from "@/components/shared/ThemeToggle";

import { navLinks } from "@/constants/publicNavigations";

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenMobileSub(null);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleMobileSub = (id: number) => {
    setOpenMobileSub((current) => (current === id ? null : id));
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenMobileSub(null);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300
        ${
          scrolled
            ? "border-b border-border/70 bg-background/88 shadow-[0_8px_30px_rgb(15_23_42/0.06)] backdrop-blur-2xl"
            : "border-b border-transparent bg-background/70 backdrop-blur-xl"
        }
      `}
    >
      {/* subtle top signal */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-28 bg-gradient-to-r from-transparent via-secondary to-transparent"
          animate={{
            x: ["-20vw", "120vw"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "linear",
          }}
        />
      </div>

      <Container>
        <div
          className={`
            flex items-center justify-between
            transition-[height] duration-300
            ${scrolled ? "h-[60px]" : "h-[68px]"}
          `}
        >
          {/* Brand */}
          <Link
            href="/"
            className="group relative flex items-center gap-3 rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden border border-border bg-navy text-white">
              <span className="relative z-10 text-sm font-semibold tracking-[-0.04em]">
                B
              </span>

              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-secondary"
                initial={{ scaleX: 0.35 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-semibold tracking-[-0.035em] text-heading sm:text-xl">
                Blackcrest
                <span className="text-secondary">.</span>
              </span>

              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground xl:inline">
                Advisory
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-5">
            {/* Navigation capsule */}
            <nav
              aria-label="Primary navigation"
              className="
                flex items-center gap-1
                border border-border/70
                bg-card/70
                p-1
                shadow-[var(--shadow-control-inset)]
                backdrop-blur-xl
              "
            >
              {navLinks.map((link) => {
                const hasChildren = Boolean(link.children?.length);
                const active = isActive(link.link);

                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => {
                      if (hasChildren) {
                        setOpenDropdown(link.id);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hasChildren) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <Link
                      href={link.link}
                      aria-current={active ? "page" : undefined}
                      className={`
                        group/nav relative flex h-9 items-center gap-1.5
                        px-3 text-sm font-medium
                        transition-colors duration-250
                        focus-visible:outline-none
                        ${
                          active
                            ? "bg-navy text-white shadow-[var(--shadow-action)]"
                            : "text-foreground/75 hover:bg-muted hover:text-heading"
                        }
                      `}
                    >
                      {active && (
                        <motion.span
                          layoutId="desktop-nav-active"
                          className="absolute inset-0 -z-10 bg-navy"
                          transition={{
                            type: "spring",
                            stiffness: 330,
                            damping: 30,
                          }}
                        />
                      )}

                      <span className="relative z-10">{link.name}</span>

                      {hasChildren && (
                        <ChevronDown
                          className={`
                            relative z-10 h-3.5 w-3.5
                            transition-transform duration-250
                            ${openDropdown === link.id ? "rotate-180" : ""}
                          `}
                        />
                      )}

                      {!active && (
                        <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover/nav:scale-x-100" />
                      )}
                    </Link>

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
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <div className="h-6 w-px bg-border" />

              <Button variant="outline" size="sm" href="/login">
                Login
              </Button>

              <Button
                variant="primary"
                size="sm"
                href="/select-industry"
                className="group"
              >
                Get Started
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="
                relative flex h-10 w-10 items-center justify-center
                border border-border bg-card
                text-foreground
                transition-colors hover:bg-muted
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring/60
              "
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>

              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "menu"}
                  initial={{
                    opacity: 0,
                    rotate: -12,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 12,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="absolute"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </Container>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.22,
              },
            }}
            className="overflow-hidden border-t border-border/70 bg-background/96 backdrop-blur-2xl lg:hidden"
          >
            <Container>
              <div className="py-5">
                {/* menu metadata */}
                <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    Navigation
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60">
                    BCR / Menu
                  </span>
                </div>

                <nav aria-label="Mobile navigation" className="space-y-1">
                  {navLinks.map((link, index) => {
                    const hasChildren = Boolean(link.children?.length);
                    const active = isActive(link.link);
                    const submenuOpen = openMobileSub === link.id;

                    return (
                      <motion.div
                        key={link.id}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.045,
                          duration: 0.28,
                        }}
                        className="border-b border-border/60 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <Link
                            href={link.link}
                            onClick={closeMobileMenu}
                            aria-current={active ? "page" : undefined}
                            className={`
                              flex min-h-14 flex-1 items-center gap-4 py-3
                              transition-colors
                              ${active ? "text-secondary" : "text-heading"}
                            `}
                          >
                            <span
                              className={`
                                font-mono text-[9px]
                                ${
                                  active
                                    ? "text-secondary"
                                    : "text-muted-foreground/40"
                                }
                              `}
                            >
                              0{index + 1}
                            </span>

                            <span className="text-lg font-medium tracking-[-0.02em]">
                              {link.name}
                            </span>

                            {active && (
                              <motion.span
                                layoutId="mobile-active-dot"
                                className="h-1.5 w-1.5 rounded-full bg-secondary"
                              />
                            )}
                          </Link>

                          {hasChildren && (
                            <button
                              type="button"
                              onClick={() => toggleMobileSub(link.id)}
                              aria-expanded={submenuOpen}
                              aria-label={`Toggle ${link.name} submenu`}
                              className="
                                flex h-10 w-10 items-center justify-center
                                text-muted-foreground
                                transition-colors
                                hover:bg-muted hover:text-heading
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-ring/60
                              "
                            >
                              <ChevronDown
                                className={`
                                  h-4 w-4
                                  transition-transform duration-250
                                  ${submenuOpen ? "rotate-180" : ""}
                                `}
                              />
                            </button>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {hasChildren && submenuOpen && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.28,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="mb-4 ml-8 border-l border-secondary/25 pl-5">
                                {link.children?.map((child) => {
                                  const childActive = isActive(child.link);

                                  return (
                                    <Link
                                      key={child.id}
                                      href={child.link}
                                      onClick={closeMobileMenu}
                                      aria-current={
                                        childActive ? "page" : undefined
                                      }
                                      className={`
                                        group flex items-center justify-between
                                        py-2.5 text-sm
                                        transition-colors
                                        ${
                                          childActive
                                            ? "text-secondary"
                                            : "text-muted-foreground hover:text-heading"
                                        }
                                      `}
                                    >
                                      {child.name}

                                      <ArrowUpRight className="h-3.5 w-3.5 translate-x-[-3px] opacity-0 transition-all duration-250 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile CTAs */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                >
                  <Button
                    variant="primary"
                    href="/select-industry"
                    onClick={closeMobileMenu}
                    className="group w-full"
                  >
                    Get Started
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Button>

                  <Button
                    variant="outline"
                    href="/login"
                    onClick={closeMobileMenu}
                    className="w-full"
                  >
                    Login
                  </Button>
                </motion.div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-[10px] text-muted-foreground">
                    Blackcrest Advisory
                  </span>

                  <span className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Europe · Remote
                  </span>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
