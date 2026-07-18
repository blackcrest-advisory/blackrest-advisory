"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Globe } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/5 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Amplify Your Digital Presence?
          </h2>
          <p className="text-body text-lg max-w-2xl mx-auto">
            Let&apos;s create a digital marketing strategy that drives real
            results for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="primary" size="lg" className="group">
              Request Proposal
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              hello@blackcrestadvisory.com
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
