"use client";

//===== imports =====//
import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion, useInView, useReducedMotion } from "framer-motion";

import {
  ArrowDownRight,
  BarChart3,
  CircleDot,
  Mail,
  Megaphone,
  Search,
  ShoppingBag,
  Target,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { IMAGE } from "@/constants/imagesConfig";

//==============================================================//
// TYPES
//==============================================================//

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  shortLabel: string;
  eyebrow: string;
  icon: typeof Search;
}

//==============================================================//
// SERVICES
//==============================================================//

const services: Service[] = [
  {
    id: 1,
    title: "DIGITAL MARKETING",
    shortLabel: "Digital Strategy",
    eyebrow: "Integrated Growth",
    description:
      "Our passion for digital marketing is only matched by a burning desire to provide our clients with exceptional sales conversions and ROI, while capturing the largest possible market share in the digital sphere.",
    image: IMAGE.marketing,
    icon: Megaphone,
  },
  {
    id: 2,
    title: "SEO",
    shortLabel: "SEO",
    eyebrow: "Organic Demand",
    description:
      "Leading the pack on ROI, search engine optimization (SEO) pays huge dividends by increasing key components of your website's performance, like better page speed, mobile responsiveness, and improved organic search results.",
    image: IMAGE.seo,
    icon: Search,
  },
  {
    id: 3,
    title: "PPC & CRO MANAGEMENT",
    shortLabel: "PPC & CRO",
    eyebrow: "Paid Acquisition",
    description:
      "We use both Paid Search Advertising (PPC) and Conversion Rate Optimization (CRO) to enhance your company's success by improving your ability to hyper-target your audience through search & social media platforms.",
    image: IMAGE.management,
    icon: Target,
  },
  {
    id: 4,
    title: "CONTENT MARKETING",
    shortLabel: "Content",
    eyebrow: "Authority Building",
    description:
      "Boost your online presence and establish yourself as a thought leader in your industry by consistently publishing expert content. We will develop a strategy + calendar while creating content that ranks well on search engines.",
    image: IMAGE.content_marketing,
    icon: BarChart3,
  },
  {
    id: 5,
    title: "EMAIL MARKETING & MANAGEMENT",
    shortLabel: "Email",
    eyebrow: "Lifecycle Marketing",
    description:
      "As an online marketing firm, our digital marketing experts understand the immense effectiveness of well-executed email marketing campaigns that bring short and long-term results while continually building your subscriber list.",
    image: IMAGE.email_marketing,
    icon: Mail,
  },
  {
    id: 6,
    title: "AFFILIATE & AMAZON MARKETING SERVICES",
    shortLabel: "Commerce",
    eyebrow: "Marketplace Growth",
    description:
      "We bring the knowhow and skill to ensure your products get seen by the right customers on Amazon or as an affiliate with a mix of SEO, PPC, and storefront branding that gets your products seen on the highly competitive ecommerce platform.",
    image: IMAGE.affiliate_marketing,
    icon: ShoppingBag,
  },
];

//==============================================================//
// STICKY SCROLL
//==============================================================//

export default function StickyScroll() {
  const shouldReduceMotion = useReducedMotion();

  const [activeService, setActiveService] = useState(0);

  return (
    <Section
      className="
        relative
        isolate
        bg-background
        py-16
        sm:py-20
        lg:py-28
      "
    >
      {/* ====================================================== */}
      {/* BACKGROUND ARCHITECTURE                               */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-20
          overflow-hidden
        "
      >
        {/* main vertical divider */}
        <div
          className="
            absolute
            left-[34%] top-0
            hidden
            h-full w-px
            bg-border/45
            lg:block
          "
        />

        {/* architectural grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.18]
            [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)]
            [background-size:88px_100%]
            [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]
          "
        />

        {/* gold ambient glow */}
        <div
          className="
            absolute
            -left-40 top-[10%]
            h-[420px] w-[420px]
            rounded-full
            bg-secondary/[0.05]
            blur-[140px]
          "
        />

        {/* navy ambient glow */}
        <div
          className="
            absolute
            -right-40 bottom-[12%]
            h-[420px] w-[420px]
            rounded-full
            bg-primary/[0.045]
            blur-[140px]
          "
        />
      </div>

      <Container>
        {/* ==================================================== */}
        {/* SECTION TOP                                         */}
        {/* ==================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-12
            flex
            flex-col
            gap-4
            border-b border-border
            pb-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            lg:mb-16
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <CircleDot
              className="
                h-3.5 w-3.5
                text-secondary
              "
            />

            <span
              className="
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-secondary
              "
            >
              06 / Capability Deep Dive
            </span>

            <span
              className="
                h-px w-10
                bg-secondary/35
              "
            />
          </div>

          <span
            className="
              font-mono
              text-[7px]
              uppercase
              tracking-[0.15em]
              text-muted-foreground/35
            "
          >
            Explore the disciplines
          </span>
        </motion.div>

        {/* ==================================================== */}
        {/* STICKY EXPERIENCE                                   */}
        {/* ==================================================== */}

        <div
          className="
            grid
            min-w-0
            items-start
            gap-12
            lg:grid-cols-[minmax(270px,0.36fr)_minmax(0,0.64fr)]
            lg:gap-12
            xl:grid-cols-[minmax(320px,0.34fr)_minmax(0,0.66fr)]
            xl:gap-20
          "
        >
          {/* ================================================== */}
          {/* LEFT / STICKY INDEX                                */}
          {/* ================================================== */}

          <aside
            className="
              min-w-0
              self-start
              lg:sticky
              lg:top-28
            "
          >
            <div>
              {/* ============================================== */}
              {/* INTRO                                         */}
              {/* ============================================== */}

              <div>
                <span
                  className="
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                  "
                >
                  Full-service capability
                </span>

                <h2
                  className="
                    mt-4
                    text-3xl
                    font-semibold
                    leading-[1.02]
                    tracking-[-0.045em]
                    text-heading
                    sm:text-4xl
                    lg:text-[46px]
                    xl:text-[52px]
                  "
                >
                  The disciplines
                  <span
                    className="
                      block
                      text-secondary
                    "
                  >
                    behind the growth.
                  </span>
                </h2>

                <p
                  className="
                    mt-5
                    max-w-md
                    text-sm
                    leading-7
                    text-body
                  "
                >
                  Blackcrest brings together the channels, systems, and
                  specialist disciplines needed to build a stronger digital
                  presence and turn that presence into measurable opportunity.
                </p>
              </div>

              {/* ============================================== */}
              {/* ACTIVE INDEX                                  */}
              {/* ============================================== */}

              <div
                className="
                  mt-9
                  hidden
                  border-y border-border
                  lg:block
                "
              >
                {services.map((service, index) => {
                  const isActive = activeService === index;

                  const Icon = service.icon;

                  return (
                    <div
                      key={service.id}
                      className={`
                          relative
                          flex
                          items-center
                          gap-3
                          border-b
                          border-border
                          py-3.5
                          last:border-b-0
                          transition-all
                          duration-300

                          ${isActive ? "pl-3" : "pl-0"}
                        `}
                    >
                      {/* active rail */}
                      <span
                        aria-hidden="true"
                        className={`
                            absolute
                            bottom-2 left-0 top-2
                            w-[2px]
                            bg-secondary
                            transition-opacity
                            duration-300

                            ${isActive ? "opacity-100" : "opacity-0"}
                          `}
                      />

                      {/* number */}
                      <span
                        className={`
                            font-mono
                            text-[7px]
                            font-semibold
                            transition-colors

                            ${
                              isActive
                                ? "text-secondary"
                                : "text-muted-foreground/30"
                            }
                          `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* icon */}
                      <Icon
                        className={`
                            h-3.5 w-3.5
                            shrink-0
                            transition-colors

                            ${
                              isActive
                                ? "text-secondary"
                                : "text-muted-foreground/25"
                            }
                          `}
                      />

                      {/* label */}
                      <span
                        className={`
                            min-w-0
                            truncate
                            text-xs
                            font-medium
                            transition-colors

                            ${
                              isActive
                                ? "text-heading"
                                : "text-muted-foreground/45"
                            }
                          `}
                      >
                        {service.shortLabel}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ============================================== */}
              {/* PROGRESS                                      */}
              {/* ============================================== */}

              <div
                className="
                  mt-6
                  hidden
                  lg:block
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[7px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-muted-foreground/35
                    "
                  >
                    Capability index
                  </span>

                  <span
                    className="
                      font-mono
                      text-[7px]
                      font-semibold
                      text-secondary
                    "
                  >
                    {String(activeService + 1).padStart(2, "0")}/
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>

                <div
                  className="
                    mt-3
                    h-px
                    overflow-hidden
                    bg-border
                  "
                >
                  <motion.div
                    className="
                      h-full
                      bg-secondary
                    "
                    animate={{
                      width: `${
                        ((activeService + 1) / services.length) * 100
                      }%`,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* ================================================== */}
          {/* RIGHT / CAPABILITY CHAPTERS                        */}
          {/* ================================================== */}

          <div className="min-w-0">
            {services.map((service, index) => (
              <CapabilityChapter
                key={service.id}
                service={service}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
                onActiveService={setActiveService}
              />
            ))}
          </div>
        </div>

        {/* ==================================================== */}
        {/* BOTTOM STATEMENT                                    */}
        {/* ==================================================== */}

        <div
          className="
            mt-12
            grid
            border-y border-border
            bg-card
            md:grid-cols-[minmax(0,1fr)_auto]
            md:items-center
            lg:mt-20
          "
        >
          <div
            className="
              px-5 py-5
              sm:px-6
            "
          >
            <span
              className="
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-secondary
              "
            >
              Built around the opportunity
            </span>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-muted-foreground
              "
            >
              The right marketing mix is not the same for every business. The
              objective is to deploy the disciplines that create the strongest
              path from attention to commercial growth.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              border-t border-border
              px-5 py-4
              md:border-l
              md:border-t-0
              sm:px-6
            "
          >
            <ArrowDownRight
              className="
                h-4 w-4
                text-secondary
              "
            />

            <span
              className="
                whitespace-nowrap
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-muted-foreground/40
              "
            >
              Strategy before channels
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

//==============================================================//
// CAPABILITY CHAPTER
//==============================================================//

function CapabilityChapter({
  service,
  index,
  shouldReduceMotion,
  onActiveService,
}: {
  service: Service;
  index: number;
  shouldReduceMotion: boolean | null;
  onActiveService: (index: number) => void;
}) {
  const chapterRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(chapterRef, {
    amount: 0.48,
    margin: "-15% 0px -15% 0px",
  });

  //===== Sync the sticky index with the chapter currently in view =====//
  useEffect(() => {
    if (!isInView) return;

    onActiveService(index);
  }, [isInView, index, onActiveService]);

  const Icon = service.icon;

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={chapterRef}
      initial={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 35,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.16,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        min-w-0
        border-b border-border
        py-8
        first:pt-0
        last:border-b-0
        lg:min-h-[76vh]
        lg:py-14
        xl:min-h-[82vh]
      "
    >
      {/* ====================================================== */}
      {/* MOBILE INDEX                                          */}
      {/* ====================================================== */}

      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-4
          lg:hidden
        "
      >
        <span
          className="
            font-mono
            text-[8px]
            font-semibold
            text-secondary
          "
        >
          {String(index + 1).padStart(2, "0")}/
          {String(services.length).padStart(2, "0")}
        </span>

        <span
          className="
            font-mono
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-muted-foreground/35
          "
        >
          {service.eyebrow}
        </span>
      </div>

      {/* ====================================================== */}
      {/* IMAGE STAGE                                           */}
      {/* ====================================================== */}

      <div
        className="
          relative
          min-h-[380px]
          overflow-hidden
          border border-border
          bg-primary
          shadow-[var(--shadow-card)]
          sm:min-h-[480px]
          xl:min-h-[520px]
        "
      >
        {/* image */}
        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.08,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute inset-0
          "
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="
              (max-width: 1024px) 100vw,
              65vw
            "
            className="
              object-cover
            "
          />
        </motion.div>

        {/* cinematic bottom fade */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-t
            from-navy-deep/95
            via-navy-deep/30
            to-navy-deep/10
          "
        />

        {/* alternating directional shade */}
        <div
          aria-hidden="true"
          className={`
            absolute inset-0

            ${
              isEven
                ? "bg-gradient-to-r from-navy-deep/65 via-transparent to-transparent"
                : "bg-gradient-to-l from-navy-deep/65 via-transparent to-transparent"
            }
          `}
        />

        {/* technical grid */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            opacity-[0.14]
            [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)]
            [background-size:72px_72px]
            [mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]
          "
        />

        {/* ==================================================== */}
        {/* TOP STATUS                                          */}
        {/* ==================================================== */}

        <div
          className="
            absolute
            left-5 right-5 top-5
            flex
            items-start
            justify-between
            gap-4
            sm:left-6
            sm:right-6
            sm:top-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex h-9 w-9
                items-center
                justify-center
                border border-white/15
                bg-navy-deep/60
                text-gold-light
                backdrop-blur-md
              "
            >
              <Icon className="h-4 w-4" />
            </div>

            <div>
              <span
                className="
                  block
                  font-mono
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-gold-light
                "
              >
                {service.eyebrow}
              </span>

              <span
                className="
                  mt-1
                  block
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.13em]
                  text-white/35
                "
              >
                Capability / {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          <span
            className="
              hidden
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-white/30
              sm:block
            "
          >
            Blackcrest Digital
          </span>
        </div>

        {/* ==================================================== */}
        {/* TITLE                                               */}
        {/* ==================================================== */}

        <div
          className="
            absolute
            bottom-5 left-5 right-5
            sm:bottom-7
            sm:left-7
            sm:right-7
          "
        >
          <motion.span
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    width: 0,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    width: 42,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            aria-hidden="true"
            className="
              mb-4
              block
              h-px
              bg-gold-light
            "
          />

          <h3
            className="
              max-w-3xl
              text-2xl
              font-semibold
              leading-[1.02]
              tracking-[-0.035em]
              text-white
              sm:text-3xl
              lg:text-4xl
              xl:text-[44px]
            "
          >
            {service.title}
          </h3>
        </div>

        {/* corner marker */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-3 right-3
            h-5 w-5
            border-b border-r
            border-gold-light/45
          "
        />
      </div>

      {/* ====================================================== */}
      {/* DESCRIPTION                                           */}
      {/* ====================================================== */}

      <div
        className="
          grid
          min-w-0
          gap-5
          border-x
          border-b
          border-border
          bg-card
          px-5 py-5
          sm:px-6
          lg:grid-cols-[auto_minmax(0,1fr)]
          lg:gap-8
          lg:px-7
          lg:py-6
        "
      >
        {/* chapter number */}
        <div
          className="
            flex
            items-center
            gap-3
            lg:items-start
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              font-semibold
              text-secondary
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className="
              h-px w-7
              bg-secondary/30
              lg:mt-1.5
            "
          />
        </div>

        {/* copy */}
        <div className="min-w-0">
          <p
            className="
              max-w-3xl
              text-sm
              leading-7
              text-body
              sm:text-base
              sm:leading-8
            "
          >
            {service.description}
          </p>

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-secondary
              "
            />

            <span
              className="
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-muted-foreground/35
              "
            >
              {service.shortLabel}
              {" / "}
              Digital Growth Capability
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
