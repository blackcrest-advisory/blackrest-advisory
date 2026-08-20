"use client";

//===== imports =====//
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  Handshake,
  Target,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//==============================================================//
// COMMERCIAL CAPABILITIES
//==============================================================//

const capabilities = [
  "B2B Sales Strategy",
  "Pipeline Development",
  "Sales Process Optimisation",
  "Client Retention",
];

//==============================================================//
// PIPELINE STAGES
//==============================================================//

const pipeline = [
  {
    id: "01",
    label: "Prospects",
    description: "Identify the right commercial opportunities.",
    icon: Target,
  },
  {
    id: "02",
    label: "Qualified",
    description: "Focus attention on opportunities with real potential.",
    icon: UserRoundCheck,
  },
  {
    id: "03",
    label: "Opportunity",
    description: "Build momentum through a structured sales process.",
    icon: BriefcaseBusiness,
  },
  {
    id: "04",
    label: "Client",
    description: "Convert, retain and grow valuable relationships.",
    icon: Handshake,
  },
];

//==============================================================//
// SALES HERO
//==============================================================//

export const SalesHero = () => {
  return (
    <Section
      className="
        relative
        isolate
        overflow-hidden
        bg-background
        py-0
      "
    >
      {/* ====================================================== */}
      {/* BACKGROUND                                            */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-20
        "
      >
        <div
          className="
            absolute
            right-[8%] top-[10%]
            h-[420px] w-[420px]
            rounded-full
            bg-secondary/[0.05]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            bottom-[-160px] left-[5%]
            h-[360px] w-[360px]
            rounded-full
            bg-primary/[0.04]
            blur-[150px]
          "
        />
      </div>

      <Container>
        {/* ==================================================== */}
        {/* TOP BAR                                             */}
        {/* ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-x border-b border-border
            px-4 py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
            lg:px-8
          "
        >
          <div className="flex items-center gap-3">
            <CircleDollarSign className="h-3.5 w-3.5 text-secondary" />

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
              Commercial Growth
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.14em]
                text-muted-foreground/35
              "
            >
              Sales / Pipeline / Retention
            </span>

            <span
              className="
                hidden
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-secondary
                sm:block
              "
            >
              Practice / 01
            </span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* HERO BODY                                           */}
        {/* ==================================================== */}

        <div
          className="
            grid
            min-w-0
            border-x border-border
            lg:min-h-[700px]
            lg:grid-cols-[minmax(0,0.95fr)_minmax(480px,1.05fr)]
          "
        >
          {/* ================================================== */}
          {/* LEFT CONTENT                                      */}
          {/* ================================================== */}

          <div
            className="
              flex
              min-w-0
              flex-col
              justify-center
              border-b border-border
              px-5 py-14
              sm:px-7
              sm:py-16
              lg:border-b-0
              lg:border-r
              lg:px-8
              lg:py-20
              xl:px-10
            "
          >
            {/* eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="
                  flex h-8 w-8
                  items-center
                  justify-center
                  border border-secondary/20
                  bg-secondary/[0.045]
                  text-secondary
                "
              >
                <TrendingUp className="h-3.5 w-3.5" />
              </div>

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
                Sales & Business Support
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            {/* ================================================== */}
            {/* HEADLINE                                          */}
            {/* ================================================== */}

            <h1
              className="
                mt-8
                max-w-[760px]
                text-[42px]
                font-semibold
                leading-[0.97]
                tracking-[-0.06em]
                text-heading
                sm:text-[56px]
                lg:text-[60px]
                xl:text-[68px]
              "
            >
              Turn commercial effort
              <span className="block text-secondary">
                into a repeatable system.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-body
                sm:text-base
                sm:leading-8
              "
            >
              Blackcrest helps B2B businesses strengthen the commercial process
              behind growth — from pipeline development and sales structure to
              conversion, account management and long-term client retention.
            </p>

            {/* ================================================== */}
            {/* CAPABILITIES                                      */}
            {/* ================================================== */}

            <div
              className="
                mt-7
                grid
                max-w-lg
                grid-cols-1
                gap-3
                sm:grid-cols-2
              "
            >
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      flex h-4 w-4
                      shrink-0
                      items-center
                      justify-center
                      border border-secondary/25
                      text-secondary
                    "
                  >
                    <Check className="h-2.5 w-2.5" />
                  </span>

                  <span
                    className="
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    {capability}
                  </span>
                </div>
              ))}
            </div>

            {/* ================================================== */}
            {/* CTA                                               */}
            {/* ================================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <Button
                href="#capabilities"
                variant="primary"
                size="md"
                className="
                  group
                  w-full
                  !rounded-md
                  sm:w-auto
                "
              >
                Explore Services
                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Button>

              <Button
                href="#contact"
                variant="outline"
                size="md"
                className="
                  w-full
                  !rounded-md
                  sm:w-auto
                "
              >
                Talk to an Expert
              </Button>
            </div>

            {/* ================================================== */}
            {/* COMMERCIAL PRINCIPLES                             */}
            {/* ================================================== */}

            <div
              className="
                mt-10
                grid
                grid-cols-3
                border-y border-border
              "
            >
              <Principle label="Focus" value="Right Opportunities" />

              <Principle label="Process" value="Clear Pipeline" />

              <Principle label="Growth" value="Stronger Accounts" last />
            </div>
          </div>

          {/* ================================================== */}
          {/* RIGHT / PIPELINE BOARD                            */}
          {/* ================================================== */}

          <div
            className="
              relative
              min-h-[600px]
              overflow-hidden
              bg-primary
              px-5 py-8
              text-white
              sm:px-7
              sm:py-10
              lg:min-h-0
              lg:px-8
              lg:py-12
            "
          >
            {/* subtle backdrop */}
            <span
              aria-hidden="true"
              className="
                absolute
                -right-10
                top-[18%]
                select-none
                text-[150px]
                font-semibold
                tracking-[-0.08em]
                text-white/[0.018]
                sm:text-[190px]
              "
            >
              SALES
            </span>

            {/* ================================================= */}
            {/* BOARD HEADER                                    */}
            {/* ================================================= */}

            <div
              className="
                relative z-10
                flex
                items-center
                justify-between
                gap-4
                border-b border-white/10
                pb-5
              "
            >
              <div>
                <span
                  className="
                    font-mono
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-gold-light
                  "
                >
                  Commercial pipeline
                </span>

                <h2
                  className="
                    mt-2
                    text-xl
                    font-semibold
                    tracking-[-0.025em]
                    text-white
                  "
                >
                  From opportunity to account growth.
                </h2>
              </div>

              <div
                className="
                  hidden
                  items-center
                  gap-2
                  sm:flex
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-success" />

                <span
                  className="
                    font-mono
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-white/30
                  "
                >
                  Active
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* PIPELINE                                        */}
            {/* ================================================= */}

            <div
              className="
                relative z-10
                mt-7
              "
            >
              {pipeline.map((stage, index) => {
                const Icon = stage.icon;
                const isLast = index === pipeline.length - 1;

                return (
                  <div
                    key={stage.id}
                    className="
                      relative
                      grid
                      grid-cols-[42px_minmax(0,1fr)]
                      gap-4
                    "
                  >
                    {/* left rail */}
                    <div
                      className="
                        relative
                        flex
                        flex-col
                        items-center
                      "
                    >
                      <div
                        className="
                          relative z-10
                          flex h-10 w-10
                          items-center
                          justify-center
                          border border-gold-light/25
                          bg-white/[0.035]
                          text-gold-light
                        "
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      {!isLast && (
                        <div
                          className="
                            h-full
                            min-h-[58px]
                            w-px
                            bg-white/10
                          "
                        />
                      )}
                    </div>

                    {/* content */}
                    <div
                      className={`
                        min-w-0
                        pb-7

                        ${!isLast ? "border-b border-white/10" : ""}
                      `}
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-5
                        "
                      >
                        <div>
                          <span
                            className="
                              font-mono
                              text-[7px]
                              font-semibold
                              text-gold-light/55
                            "
                          >
                            {stage.id}
                          </span>

                          <h3
                            className="
                              mt-1
                              text-base
                              font-semibold
                              text-white
                            "
                          >
                            {stage.label}
                          </h3>
                        </div>

                        <span
                          className="
                            font-mono
                            text-[6px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-white/20
                          "
                        >
                          Stage
                        </span>
                      </div>

                      <p
                        className="
                          mt-2
                          max-w-sm
                          text-xs
                          leading-5
                          text-white/40
                        "
                      >
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================================================= */}
            {/* COMMERCIAL OUTCOME                              */}
            {/* ================================================= */}

            <div
              className="
                relative z-10
                mt-8
                border border-gold-light/15
                bg-white/[0.025]
                p-5
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <span
                    className="
                      font-mono
                      text-[7px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-gold-light
                    "
                  >
                    Commercial objective
                  </span>

                  <p
                    className="
                      mt-2
                      max-w-sm
                      text-sm
                      font-medium
                      leading-6
                      text-white
                    "
                  >
                    Create a sales system that is easier to manage, easier to
                    measure and easier to improve.
                  </p>
                </div>

                <div
                  className="
                    flex h-11 w-11
                    shrink-0
                    items-center
                    justify-center
                    border border-gold-light/20
                    text-gold-light
                  "
                >
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* BOTTOM STRIP                                    */}
            {/* ================================================= */}

            <div
              className="
                relative z-10
                mt-8
                grid
                grid-cols-3
                border-y border-white/10
              "
            >
              <DarkMetric label="Acquire" value="Right-fit leads" />

              <DarkMetric label="Convert" value="Stronger process" />

              <DarkMetric label="Retain" value="Longer relationships" last />
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* BOTTOM RAIL                                         */}
        {/* ==================================================== */}

        <div
          className="
            grid
            border-x border-t border-border
            sm:grid-cols-[minmax(0,1fr)_auto]
            sm:items-center
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              px-4 py-4
              sm:px-6
              lg:px-8
            "
          >
            <Target className="h-3.5 w-3.5 text-secondary" />

            <span
              className="
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-muted-foreground/40
              "
            >
              Prospect → Qualify → Convert → Retain → Grow
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              border-t border-border
              px-4 py-4
              sm:border-l
              sm:border-t-0
              sm:px-6
            "
          >
            <Handshake className="h-3.5 w-3.5 text-secondary" />

            <span
              className="
                whitespace-nowrap
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.13em]
                text-muted-foreground/35
              "
            >
              Built around commercial outcomes
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
};

//==============================================================//
// PRINCIPLE
//==============================================================//

function Principle({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        min-w-0
        px-3 py-4
        sm:px-4

        ${!last ? "border-r border-border" : ""}
      `}
    >
      <span
        className="
          block
          font-mono
          text-[6px]
          font-semibold
          uppercase
          tracking-[0.13em]
          text-muted-foreground/35
        "
      >
        {label}
      </span>

      <span
        className="
          mt-2
          block
          text-[10px]
          font-semibold
          leading-4
          text-heading
        "
      >
        {value}
      </span>
    </div>
  );
}

//==============================================================//
// DARK METRIC
//==============================================================//

function DarkMetric({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        min-w-0
        px-3 py-4
        sm:px-4

        ${!last ? "border-r border-white/10" : ""}
      `}
    >
      <span
        className="
          block
          font-mono
          text-[6px]
          font-semibold
          uppercase
          tracking-[0.13em]
          text-gold-light/55
        "
      >
        {label}
      </span>

      <span
        className="
          mt-2
          block
          text-[10px]
          font-semibold
          leading-4
          text-white/60
        "
      >
        {value}
      </span>
    </div>
  );
}
