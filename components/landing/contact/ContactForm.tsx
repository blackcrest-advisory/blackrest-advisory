"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LuSend,
  LuUser,
  LuMail,
  LuMessageSquare,
  LuBuilding2,
} from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { contactInfoData } from "@/content-data/contact/contactData";
import { submitContactForm } from "@/api-client/contact.api";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/TextArea";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        companyName: formData.company,
        problem: formData.message,
      });
      toast.success("Message sent! We'll be in touch within 24 hours");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    //===== Contact form section with two-column layout =====//
    <Section>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-16"
        >
          {/*===== Left column: Form =====*/}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Get In Touch
            </span>
            <h2 className="relative mt-2 text-3xl font-bold text-foreground md:text-4xl after:absolute after:bottom-[-6px] after:left-0 after:h-1 after:w-16 after:rounded after:bg-secondary">
              Send Us a Message
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Fill in the form below and our team will get back to you within 24
              hours. We&apos;re here to help you grow your business.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20"
              >
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  Thank you! 🎉
                </h3>
                <p className="mt-1 text-green-600 dark:text-green-300">
                  We&apos;ve received your message and will get back to you
                  shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-sm font-medium text-secondary hover:underline"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    icon={LuUser}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    icon={LuMail}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Company Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    icon={LuBuilding2}
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message *
                  </label>

                  <Textarea
                    id="message"
                    name="message"
                    icon={LuMessageSquare}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="resize-none"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <LuSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/*===== Right column: Contact info =====*/}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card padding="lg">
              <h3 className="mb-6 text-xl font-bold text-foreground">
                Connect With Us
              </h3>
              <div className="space-y-6">
                {contactInfoData.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h4>
                      {item.details.map((detail, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/*===== Quick response badge =====*/}
            <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                ⚡{" "}
                <strong className="text-secondary">
                  Average response time:
                </strong>{" "}
                <span className="font-semibold text-foreground">
                  Under 4 hours
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                We&apos;re committed to fast, professional communication
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};
