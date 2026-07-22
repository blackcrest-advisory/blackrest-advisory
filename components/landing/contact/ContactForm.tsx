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
import { contactInfoData } from "@/content-data/contact/contactData";
import { submitContactForm } from "@/api-client/contact.api";
import toast from "react-hot-toast";

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
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left – form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-secondary">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary dark:text-white relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-16 after:h-1 after:bg-secondary after:rounded">
              Send Us a Message
            </h2>
            <p className="mt-6 text-body dark:text-body leading-relaxed">
              Fill in the form below and our team will get back to you within 24
              hours. We&apos;re here to help you grow your business.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  Thank you! 🎉
                </h3>
                <p className="text-green-600 dark:text-green-300 mt-1">
                  We&apos;ve received your message and will get back to you
                  shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-sm text-secondary font-medium hover:underline"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-primary dark:text-white mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-primary dark:text-white placeholder:text-body/50"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary dark:text-white mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-primary dark:text-white placeholder:text-body/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-primary dark:text-white mb-2"
                  >
                    Company Name
                  </label>
                  <div className="relative">
                    <LuBuilding2 className="absolute left-3 top-1/2 -translate-y-1/2 text-body/50" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-primary dark:text-white placeholder:text-body/50"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary dark:text-white mb-2"
                  >
                    Message *
                  </label>
                  <div className="relative">
                    <LuMessageSquare className="absolute left-3 top-3 text-body/50" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors text-primary dark:text-white placeholder:text-body/50 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
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

          {/* Right – contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-6">
                Connect With Us
              </h3>
              <div className="space-y-6">
                {contactInfoData.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary dark:text-white">
                        {item.title}
                      </h4>
                      {item.details.map((detail, i) => (
                        <p
                          key={i}
                          className="text-sm text-body dark:text-body leading-relaxed"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick response badge */}
            <div className="bg-secondary/5 rounded-2xl p-6 border border-secondary/20 text-center">
              <p className="text-sm text-body dark:text-body">
                ⚡{" "}
                <strong className="text-secondary">
                  Average response time:
                </strong>{" "}
                <span className="font-semibold text-primary dark:text-white">
                  Under 4 hours
                </span>
              </p>
              <p className="text-xs text-body/70 mt-1">
                We&apos;re committed to fast, professional communication
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
