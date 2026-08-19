"use client";

//===== imports =====//
import Image from "next/image";

import {
  Activity,
  BarChart3,
  Fingerprint,
  Gauge,
  Navigation,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";

//==============================================================//
// EXPERIENCE FEATURES
//==============================================================//

const features = [
  {
    number: "01",
    title: "Smooth Navigation",
    description:
      "Clear flows and familiar gestures help users move through the product without thinking about the interface.",
    icon: Navigation,
  },
  {
    number: "02",
    title: "Secure Auth",
    description:
      "Authentication is designed to protect access without creating unnecessary friction.",
    icon: Fingerprint,
  },
  {
    number: "03",
    title: "Fast Response",
    description:
      "Efficient rendering, caching and data handling keep every interaction feeling immediate.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Offline Access",
    description:
      "Important experiences can remain useful even when connectivity becomes unreliable.",
    icon: Wifi,
  },
  {
    number: "05",
    title: "Connected Data",
    description:
      "Reliable APIs and synchronisation keep information current across sessions and devices.",
    icon: Activity,
  },
  {
    number: "06",
    title: "Useful Analytics",
    description:
      "Product insights help teams understand behavior and improve the experience after launch.",
    icon: BarChart3,
  },
];

//==============================================================//
// INSIDE EVERY TAP
//==============================================================//

const InsideEveryTap = () => {
  return (
    <Section
      className="
        relative
        overflow-hidden
        bg-muted/20
        py-16
        sm:py-20
        lg:py-28
      "
    >
      <Container>
        {/* ==================================================== */}
        {/* HEADER                                              */}
        {/* ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6
            border-b border-border
            pb-10
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-16
          "
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
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
                03 / Inside Every Tap
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <h2
              className="
                mt-5
                text-3xl
                font-semibold
                leading-[1.03]
                tracking-[-0.045em]
                text-heading
                sm:text-4xl
                lg:text-5xl
                xl:text-[56px]
              "
            >
              Simple on the surface.
              <span className="block text-secondary">
                Considered underneath.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-xl
              text-sm
              leading-7
              text-body
              sm:text-base
              sm:leading-8
            "
          >
            The best mobile products hide complexity. Navigation, performance,
            security and connectivity work quietly behind the interface so the
            experience feels natural.
          </p>
        </div>

        {/* ==================================================== */}
        {/* INTERACTION CANVAS                                  */}
        {/* ==================================================== */}

        <div
          className="
            relative
            mt-12
            min-h-[820px]
            overflow-hidden
            border border-border
            bg-card
            shadow-[var(--shadow-card)]
            lg:mt-16
          "
        >
          {/* ================================================== */}
          {/* LARGE BACKGROUND TYPE                             */}
          {/* ================================================== */}

          <span
            aria-hidden="true"
            className="
              absolute
              left-1/2 top-1/2
              -translate-x-1/2
              -translate-y-1/2
              select-none
              whitespace-nowrap
              text-[150px]
              font-semibold
              tracking-[-0.08em]
              text-secondary/[0.025]
              sm:text-[200px]
              lg:text-[260px]
            "
          >
            TOUCH
          </span>

          {/* ================================================== */}
          {/* PHONE                                             */}
          {/* ================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              z-10
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <div
              className="
                relative
                rounded-[34px]
                border-[5px]
                border-primary
                bg-primary
                p-[3px]
                shadow-[0_30px_70px_rgba(10,22,40,0.2)]
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-[25px]
                  bg-card
                "
              >
                <Image
                  src={IMAGE.phoneMockup}
                  alt="Mobile application interface"
                  width={300}
                  height={600}
                  priority
                  className="
                    h-[420px]
                    w-[220px]
                    object-cover
                    sm:h-[470px]
                    sm:w-[245px]
                  "
                />
              </div>

              <div
                className="
                  absolute
                  left-1/2 top-2
                  h-1.5 w-12
                  -translate-x-1/2
                  rounded-full
                  bg-primary
                "
              />
            </div>

            <div
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

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
                Interaction ready
              </span>
            </div>
          </div>

          {/* ================================================== */}
          {/* FEATURE 01                                        */}
          {/* ================================================== */}

          <FeatureBlock
            className="
              left-5 top-6
              sm:left-8 sm:top-10
              lg:left-[6%]
              lg:top-[11%]
            "
            {...features[0]}
          />

          {/* ================================================== */}
          {/* FEATURE 02                                        */}
          {/* ================================================== */}

          <FeatureBlock
            className="
              right-5 top-6
              sm:right-8 sm:top-10
              lg:right-[6%]
              lg:top-[11%]
            "
            align="right"
            {...features[1]}
          />

          {/* ================================================== */}
          {/* FEATURE 03                                        */}
          {/* ================================================== */}

          <FeatureBlock
            className="
              right-5 top-[34%]
              sm:right-8
              lg:right-[3%]
              lg:top-[40%]
            "
            align="right"
            {...features[2]}
          />

          {/* ================================================== */}
          {/* FEATURE 04                                        */}
          {/* ================================================== */}

          <FeatureBlock
            className="
              left-5 bottom-[26%]
              sm:left-8
              lg:left-[4%]
              lg:bottom-[27%]
            "
            {...features[3]}
          />

          {/* ================================================== */}
          {/* FEATURE 05                                        */}
          {/* ================================================== */}

          <FeatureBlock
            className="
              right-5 bottom-[11%]
              sm:right-8
              lg:right-[7%]
              lg:bottom-[10%]
            "
            align="right"
            {...features[4]}
          />

          {/* ================================================== */}
          {/* FEATURE 06                                        */}
          {/* ================================================== */}

          <FeatureBlock
            className="
              left-5 bottom-[7%]
              sm:left-8
              lg:left-[8%]
              lg:bottom-[8%]
            "
            {...features[5]}
          />

          {/* ================================================== */}
          {/* MOBILE/TABLET FALLBACK                            */}
          {/* ================================================== */}

          <div
            className="
              absolute
              bottom-5 left-5 right-5
              z-20
              grid
              grid-cols-2
              gap-3
              lg:hidden
            "
          >
            {features.slice(0, 4).map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    border border-border
                    bg-card/95
                    p-3
                    backdrop-blur
                  "
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-secondary" />

                    <span
                      className="
                        text-[11px]
                        font-semibold
                        text-heading
                      "
                    >
                      {feature.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* hide desktop blocks below lg */}
          <style jsx>{`
            @media (max-width: 1023px) {
              .desktop-feature {
                display: none;
              }
            }
          `}</style>
        </div>

        {/* ==================================================== */}
        {/* PRINCIPLE STRIP                                     */}
        {/* ==================================================== */}

        <div
          className="
            mt-6
            grid
            overflow-hidden
            border border-border
            bg-card
            sm:grid-cols-3
          "
        >
          <Principle
            icon={Gauge}
            label="Responsive"
            description="Every interaction feels immediate."
          />

          <Principle
            icon={Fingerprint}
            label="Protected"
            description="Security stays behind the experience."
          />

          <Principle
            icon={Smartphone}
            label="Intuitive"
            description="The interface feels familiar from the first tap."
            last
          />
        </div>

        {/* ==================================================== */}
        {/* CLOSING                                             */}
        {/* ==================================================== */}

        <div
          className="
            mt-9
            flex
            flex-col
            gap-4
            border-t border-border
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-xl
              text-base
              font-medium
              leading-7
              tracking-[-0.015em]
              text-heading
            "
          >
            Good mobile engineering is rarely noticed. Friction is.
          </p>

          <span
            className="
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-secondary
            "
          >
            Touch / Response / Trust
          </span>
        </div>
      </Container>
    </Section>
  );
};

export default InsideEveryTap;

//==============================================================//
// FEATURE BLOCK
//==============================================================//

function FeatureBlock({
  number,
  icon: Icon,
  title,
  description,
  className,
  align = "left",
}: {
  number: string;
  icon: typeof Navigation;
  title: string;
  description: string;
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <article
      className={`
        desktop-feature
        absolute
        z-20
        max-w-[250px]
        ${className ?? ""}
      `}
    >
      <div
        className={`
          flex
          items-center
          gap-3

          ${align === "right" ? "justify-end" : ""}
        `}
      >
        {align === "right" && (
          <span
            className="
              font-mono
              text-[7px]
              font-semibold
              text-secondary/50
            "
          >
            {number}
          </span>
        )}

        <div
          className="
            flex h-9 w-9
            shrink-0
            items-center
            justify-center
            border border-secondary/15
            bg-secondary/[0.045]
            text-secondary
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        {align === "left" && (
          <span
            className="
              font-mono
              text-[7px]
              font-semibold
              text-secondary/50
            "
          >
            {number}
          </span>
        )}
      </div>

      <div
        className={`
          mt-3

          ${align === "right" ? "text-right" : ""}
        `}
      >
        <h3
          className="
            text-lg
            font-semibold
            tracking-[-0.025em]
            text-heading
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            text-xs
            leading-5
            text-muted-foreground
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

//==============================================================//
// PRINCIPLE
//==============================================================//

function Principle({
  icon: Icon,
  label,
  description,
  last = false,
}: {
  icon: typeof Gauge;
  label: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-4
        px-5 py-5
        sm:px-6

        ${!last ? "border-b border-border sm:border-b-0 sm:border-r" : ""}
      `}
    >
      <div
        className="
          flex h-9 w-9
          shrink-0
          items-center
          justify-center
          border border-secondary/15
          bg-secondary/[0.04]
          text-secondary
        "
      >
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h3
          className="
            text-sm
            font-semibold
            text-heading
          "
        >
          {label}
        </h3>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-muted-foreground
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}
