"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const FooterCta = () => {
  return (
    <Section className="bg-navy-deep">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Build Your Next Digital Product?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Let&apos;s bring your vision to life with a tailored solution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              Schedule Consultation
            </Button>
            <Button
              href="/contact"
              variant="outline-inverse"
              size="lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
