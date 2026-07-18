"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../../shared/SectionHeader";
import { ChevronDown } from "lucide-react";

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
    <section id="faq" className="py-20 md:py-32 bg-muted/30 dark:bg-muted/10">
      <div className="container max-w-3xl mx-auto">
        <SectionHeader
          tag="Frequently Asked Questions"
          title="Common Questions About Working With Us"
          description="Find answers to the most common queries about our engagement process, timelines, and deliverables."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-border rounded-xl overflow-hidden bg-background"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-foreground">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-body/50" />
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
                      <div className="px-6 pb-6 text-body/80 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
