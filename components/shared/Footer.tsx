"use client";

import { navLinks } from "@/constant/navigations";
import Link from "next/link";

export default function Footer() {
  // Get children of the "Services" nav item
  const servicesItem = navLinks.find((item) => item.name === "Services");
  const servicesLinks = servicesItem?.children || [];

  // Company links: exclude "Services" and "Home"
  const companyLinks = navLinks.filter(
    (item) => item.name !== "Services" && item.name !== "Home",
  );

  return (
    <footer className="bg-footer-bg text-footer-text transition-colors">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">
                Blackcrest<span className="text-secondary">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-footer-text/70">
              Empowering European businesses through technology, marketing &
              growth.
            </p>
          </div>

          {/* Services – dynamically from navLinks */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {servicesLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="text-sm text-footer-text/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company – dynamically from navLinks (excluding Services and Home) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="text-sm text-footer-text/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact – static (keep as is) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start space-x-3">
                <MailIcon className="mt-0.5 h-5 w-5 text-secondary" />
                <span className="text-sm text-footer-text/70">
                  hello@blackcrestadvisory.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <GlobeIcon className="mt-0.5 h-5 w-5 text-secondary" />
                <span className="text-sm text-footer-text/70">
                  www.blackcrestadvisory.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 text-secondary" />
                <span className="text-sm text-footer-text/70">
                  Europe (remote)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-footer-text/50">
          <p>
            &copy; {new Date().getFullYear()} Blackcrest Advisory. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Icons (unchanged)
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
      />
    </svg>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
