"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp } from "@/utils/animations";

export default function FinalCTA() {
  return (
    <Section className="border-border/50">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl space-y-6 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Ready to Amplify Your Digital Presence?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Let&apos;s create a digital marketing strategy that drives real
            results for your business.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button variant="primary" size="md" className="group">
              Request Proposal
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="md">
              hello@blackcrestadvisory.com
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
