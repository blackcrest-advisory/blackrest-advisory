"use client";

import { navLinks } from "@/constants/publicNavigations";
import Link from "next/link";
import { Mail, Globe, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function Footer() {
  const servicesItem = navLinks.find((item) => item.name === "Services");
  const servicesLinks = servicesItem?.children || [];

  const companyLinks = navLinks.filter(
    (item) => item.name !== "Services" && item.name !== "Home",
  );

  return (
    <Section className="w-full bg-primary/90 text-primary-foreground transition-colors">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-foreground">
                Blackcrest<span className="text-secondary">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Empowering European businesses through technology, marketing &amp;
              growth.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {servicesLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="mt-0.5 h-5 w-5 text-secondary shrink-0" />
                <span className="text-sm text-primary-foreground/70 break-words">
                  hello@blackcrestadvisory.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="mt-0.5 h-5 w-5 text-secondary shrink-0" />
                <span className="text-sm text-primary-foreground/70 break-words">
                  www.blackcrestadvisory.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 text-secondary shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  Europe (remote)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-primary-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} Blackcrest Advisory. All rights
            reserved.
          </p>
        </div>
      </Container>
    </Section>
  );
}
