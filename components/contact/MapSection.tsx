"use client";

import { Section } from "@/components/ui/Section";

export const MapSection = () => {
  return (
    <Section>
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-sm font-semibold tracking-widest uppercase text-secondary">
          Find Us
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary dark:text-white relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-secondary after:rounded">
          Visit Our Headquarters
        </h2>
        <p className="mt-8 text-body dark:text-body leading-relaxed">
          We&apos;re located in the heart of London&apos;s financial district.
          Drop by or give us a call.
        </p>
      </div>

      <div className="mt-14 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative w-full h-[400px] bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.905402439892!2d-0.081784!3d51.515102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876034c4fe4c20d%3A0x9d93f8440d6b5b5b!2sBishopsgate%2C%20London!5e0!3m2!1sen!2suk!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="Blackcrest Advisory London Office"
          />
        </div>
      </div>
    </Section>
  );
};
