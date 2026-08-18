"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LuBuilding2,
  LuCheck,
  LuMail,
  LuMessageSquare,
  LuSend,
  LuUser,
} from "react-icons/lu";
import {
  ArrowUpRight,
  CircleDot,
  Clock3,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { contactInfoData } from "@/content-data/contact/contactData";
import { createContactLead } from "@/lib/actions/contact/contact.action";

const formSignals = [
  "Clear context is enough",
  "No perfect brief required",
  "We respond with next-step guidance",
];

export const ContactForm = () => {
  const reduceMotion = Boolean(useReducedMotion());

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const result = await createContactLead({
        name: formData.name,
        email: formData.email,
        companyName: formData.company,
        problem: formData.message,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Message sent! We'll be in touch within 24 hours");

      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      className="
        relative overflow-hidden
        bg-background
        py-16
        text-foreground
        transition-colors duration-300
        sm:py-20
        lg:py-28
      "
    >
      {/* ====================================================== */}
      {/* Background                                             */}
      {/* ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute left-[-14rem] top-[12%]
            h-[36rem] w-[36rem]
            opacity-50
          "
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 7%, transparent), transparent 70%)",
          }}
        />

        <div
          className="
            absolute right-[-16rem] bottom-[-14rem]
            h-[38rem] w-[38rem]
            opacity-35
          "
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container className="relative">
        {/* ====================================================== */}
        {/* Section intro                                          */}
        {/* ====================================================== */}

        <div
          className="
            grid gap-8
            border-b border-border
            pb-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-end
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -16,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <CircleDot className="h-4 w-4 text-secondary" />

              <span
                className="
                  font-mono
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-secondary
                "
              >
                Send an enquiry
              </span>

              <span className="h-px w-10 bg-secondary/40" />
            </div>

            <h2
              className="
                mt-5 max-w-xl
                text-4xl font-semibold
                tracking-[-0.045em]
                text-heading
                sm:text-5xl
              "
            >
              Tell us what
              <span className="block text-muted-foreground">
                you&apos;re working through.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.08,
            }}
            className="
              max-w-xl
              text-sm leading-7
              text-body
              sm:text-base
              lg:justify-self-end
            "
          >
            You don&apos;t need a perfect brief. Give us enough context to
            understand the challenge and we&apos;ll help you work out the right
            next step.
          </motion.p>
        </div>

        {/* ====================================================== */}
        {/* Main workspace                                         */}
        {/* ====================================================== */}

        <div
          className="
            grid
            border-b border-border
            lg:grid-cols-[1.12fr_0.88fr]
          "
        >
          {/* ==================================================== */}
          {/* FORM                                                 */}
          {/* ==================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              border-b border-border
              py-10
              lg:border-b-0
              lg:border-r
              lg:py-14
              lg:pr-14
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.18em]
                    text-muted-foreground/50
                  "
                >
                  Contact form
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-heading
                  "
                >
                  Project or partnership enquiry
                </p>
              </div>

              <span
                className="
                  font-mono
                  text-[8px]
                  text-secondary
                "
              >
                BCR / 01
              </span>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="
                  mt-8
                  border border-success/25
                  bg-success/[0.06]
                  p-7
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center
                      justify-center
                      border border-success/25
                      bg-success/[0.08]
                      text-success
                    "
                  >
                    <LuCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-heading">
                      Message received.
                    </p>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Thanks for getting in touch. We&apos;ll review your
                      enquiry and come back with the clearest next step.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="
                        mt-5
                        text-sm
                        font-semibold
                        text-secondary
                        transition-opacity
                        hover:opacity-70
                      "
                    >
                      Send another message →
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                {/* Name + email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2 block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                      "
                    >
                      Full name
                      <span className="ml-1 text-secondary">*</span>
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
                      className="
                        mb-2 block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                      "
                    >
                      Email address
                      <span className="ml-1 text-secondary">*</span>
                    </label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      icon={LuMail}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="mt-6">
                  <label
                    htmlFor="company"
                    className="
                      mb-2 block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-muted-foreground
                    "
                  >
                    Company
                  </label>

                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    icon={LuBuilding2}
                    placeholder="Company name"
                  />
                </div>

                {/* Message */}
                <div className="mt-6">
                  <div
                    className="
                      mb-2 flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <label
                      htmlFor="message"
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                      "
                    >
                      What can we help with?
                      <span className="ml-1 text-secondary">*</span>
                    </label>

                    <span
                      className="
                        hidden
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground/35
                        sm:block
                      "
                    >
                      Context over perfection
                    </span>
                  </div>

                  <Textarea
                    id="message"
                    name="message"
                    icon={LuMessageSquare}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about the challenge, project, goals, or support you need..."
                    className="resize-none"
                  />
                </div>

                {/* Support signals */}
                <div
                  className="
                    mt-6
                    flex flex-wrap
                    gap-x-5
                    gap-y-2
                    border-t border-border
                    pt-5
                  "
                >
                  {formSignals.map((signal) => (
                    <div
                      key={signal}
                      className="
                        flex items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          h-1 w-1
                          rounded-full
                          bg-secondary
                        "
                      />

                      <span
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {signal}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Submit */}
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  className="mt-7"
                >
                  <Button
                    size="lg"
                    className="group w-full justify-center sm:w-auto"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  rotate: 360,
                                }
                          }
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="
                            mr-2
                            h-4 w-4
                            rounded-full
                            border-2
                            border-primary-foreground/30
                            border-t-primary-foreground
                          "
                        />
                        Sending enquiry...
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <LuSend
                          className="
                            ml-2 h-4 w-4
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* ==================================================== */}
          {/* CONTACT PROFILE                                      */}
          {/* ==================================================== */}

          <motion.aside
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              delay: 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              bg-card
              py-10
              text-card-foreground
              lg:py-14
              lg:pl-12
            "
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.18em]
                    text-muted-foreground/50
                  "
                >
                  Direct channels
                </p>

                <h3
                  className="
                    mt-2
                    text-xl
                    font-semibold
                    tracking-[-0.025em]
                    text-heading
                  "
                >
                  Prefer another way to connect?
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.35, 1, 0.35],
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    h-1.5 w-1.5
                    rounded-full
                    bg-success
                  "
                />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-success
                  "
                >
                  Available
                </span>
              </div>
            </div>

            {/* contact info */}
            <div className="mt-8 border-t border-border">
              {contactInfoData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 + index * 0.08,
                  }}
                  className="
                    group
                    border-b border-border
                    py-6
                  "
                >
                  <div
                    className="
                      flex items-start
                      justify-between
                      gap-5
                    "
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          flex h-10 w-10
                          shrink-0
                          items-center
                          justify-center
                          border border-secondary/20
                          bg-secondary/[0.06]
                          text-secondary
                          transition-all duration-300
                          group-hover:bg-secondary
                          group-hover:text-secondary-foreground
                        "
                      >
                        {item.icon}
                      </div>

                      <div>
                        <p
                          className="
                            font-mono
                            text-[8px]
                            uppercase
                            tracking-[0.16em]
                            text-muted-foreground/45
                          "
                        >
                          0{index + 1}
                        </p>

                        <h4
                          className="
                            mt-1
                            text-sm
                            font-semibold
                            text-heading
                          "
                        >
                          {item.title}
                        </h4>

                        <div className="mt-1">
                          {item.details.map((detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="
                                break-words
                                text-sm
                                leading-6
                                text-muted-foreground
                              "
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ArrowUpRight
                      className="
                        mt-1
                        h-4 w-4
                        shrink-0
                        text-muted-foreground/20
                        transition-all duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-secondary
                      "
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* response panel */}
            <div
              className="
                mt-8
                border border-secondary/20
                bg-secondary/[0.05]
                p-5
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    bg-secondary/[0.09]
                    text-secondary
                  "
                >
                  <Clock3 className="h-4 w-4" />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.17em]
                      text-secondary
                    "
                  >
                    Response expectation
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-semibold
                      text-heading
                    "
                  >
                    We aim to reply quickly and clearly.
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-6
                      text-muted-foreground
                    "
                  >
                    Your first response should help you understand what happens
                    next — not leave you waiting for a generic sales follow-up.
                  </p>
                </div>
              </div>
            </div>

            {/* micro statement */}
            <div
              className="
                mt-8
                flex items-start
                gap-3
                border-l
                border-secondary/30
                pl-4
              "
            >
              <Sparkles
                className="
                  mt-0.5
                  h-4 w-4
                  shrink-0
                  text-secondary
                "
              />

              <p
                className="
                  max-w-sm
                  text-xs
                  leading-6
                  text-muted-foreground
                "
              >
                Project scope, retained partnership, specialist support, or
                simply an initial question — all are valid reasons to reach out.
              </p>
            </div>
          </motion.aside>
        </div>

        {/* ====================================================== */}
        {/* Bottom strip                                            */}
        {/* ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="
            flex flex-col
            gap-4 py-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <MessageSquareText className="h-4 w-4 text-secondary" />

            <p className="text-xs text-muted-foreground">
              Every conversation starts with understanding the business need.
            </p>
          </div>

          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-muted-foreground/40
            "
          >
            Enquire → Understand → Recommend → Move Forward
          </span>
        </motion.div>
      </Container>
    </Section>
  );
};
