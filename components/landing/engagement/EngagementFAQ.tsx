"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//===== FAQ data =====//
const faqs = [
  {
    question: "What is the typical timeline for a project?",
    answer:
      "Timelines vary based on scope. A website project typically takes 6–12 weeks, while a mobile app may take 12–20 weeks. We provide detailed timelines during the discovery phase and work in agile sprints to ensure regular progress.",
  },
  {
    question: "How do you ensure quality and security?",
    answer:
      "We follow European-grade quality standards with rigorous testing, code reviews, and security audits. All projects include performance optimisation, accessibility checks, and ongoing maintenance to keep your digital assets secure.",
  },
  {
    question: "Can I combine services from different pillars?",
    answer:
      "Absolutely. Our hybrid delivery model allows you to combine marketing, development, mobile, and sales support services in a single engagement. We tailor the mix to your specific business needs.",
  },
  {
    question: "What kind of reporting can I expect?",
    answer:
      "You'll receive monthly performance dashboards, weekly progress updates, and quarterly strategy reviews. Our reporting includes both activity metrics and business outcomes—leads, conversions, revenue growth.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, every engagement includes a post-launch support period. For retained partnerships, support is ongoing. For project-based work, we offer extended maintenance packages to ensure your digital assets continue to perform.",
  },
];

export const EngagementFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    //===== FAQ section with accordion =====//
    <Section className="bg-muted/30">
      <Container>
        {/*===== Section header =====*/}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
            Frequently Asked Questions
          </span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Common Questions About Working With Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Find answers to the most common queries about our engagement
            process, timelines, and deliverables.
          </p>
        </div>

        {/*===== FAQ accordion list =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-3xl space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  padding="none"
                  className="overflow-hidden border border-border"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-muted/50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-foreground">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground/50" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground/80">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};
