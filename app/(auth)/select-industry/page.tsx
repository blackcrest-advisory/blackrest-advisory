"use client";

import { motion } from "framer-motion";
import IndustrySelector from "@/components/features/auth/IndustrySelector";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp } from "@/lib/utils/animations";

export default function SelectIndustryPage() {
  return (
    //===== Select Industry Page =====//
    <PageWrapper>
      <Section className="relative flex items-center justify-center">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/*===== Header =====*/}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mb-12 text-center md:mb-16"
            >
              <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Choose Your <br className="sm:hidden" />
                <span className="text-secondary">Industry</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                Select the sector that best describes your business. We&apos;ll
                tailor your entire Blackcrest experience to fit your unique
                needs.
              </p>
            </motion.div>

            {/*===== Industry Selector =====*/}
            <IndustrySelector />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
