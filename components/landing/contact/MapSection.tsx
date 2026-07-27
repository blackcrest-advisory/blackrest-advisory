"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp } from "@/utils/animations";

export const MapSection = () => {
  return (
    //===== Map section with Google Maps iframe =====//
    <Section>
      <Container>
        {/*===== Section header =====*/}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Find Us
          </span>
          <h2 className="relative mt-2 inline-block text-3xl font-bold text-foreground md:text-4xl after:absolute after:bottom-[-6px] after:left-1/2 after:h-1 after:w-16 after:-translate-x-1/2 after:rounded after:bg-secondary">
            Visit Our Headquarters
          </h2>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            We&apos;re located in the heart of London&apos;s financial district.
            Drop by or give us a call.
          </p>
        </div>

        {/*===== Google Maps iframe =====*/}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-14 overflow-hidden rounded-2xl shadow-xl"
        >
          <div className="relative h-[400px] w-full bg-muted">
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
        </motion.div>
      </Container>
    </Section>
  );
};
