import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ClipboardPlus, Radio, ShieldCheck } from "lucide-react";

import { CreateLeadForm } from "@/components/admin-dashboard/leads/CreateLeadForm";
import { getAdminUser } from "@/lib/utils/admin-utils";

export default async function CreateLeadPage() {
  const admin = await getAdminUser();

  if (!admin) redirect("/login");

  return (
    <div className="relative min-w-0 max-w-full space-y-6">
      {/*===== BACK NAVIGATION =====*/}

      <Link
        href="/admin/dashboard/leads"
        className="group inline-flex w-fit items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-secondary"
      >
        <ArrowLeft
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
        />
        All Leads
      </Link>

      {/*===== LEAD INTAKE HEADER =====*/}

      <header
        className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* architectural rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary via-secondary/45 to-transparent"
        />

        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/[0.045] blur-[100px]"
        />

        <div
          className="relative grid gap-7 px-6 py-7 sm:px-7 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-center"
        >
          {/*===== TITLE =====*/}

          <div className="min-w-0">
            <div
              className="flex flex-wrap items-center gap-3"
            >
              <ClipboardPlus className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
              >
                Manual lead intake
              </span>

              <span className="h-px w-9 bg-secondary/30" />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40"
              >
                CRM entry
              </span>
            </div>

            <h1
              className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-heading sm:text-[38px] lg:text-[42px]"
            >
              Add Lead
            </h1>

            <p
              className="mt-3 max-w-2xl text-sm leading-7 text-body"
            >
              Record a lead received by phone, referral, or another offline
              channel and place it directly into the Blackcrest pipeline.
            </p>
          </div>

          {/*===== INTAKE STATUS =====*/}

          <div
            className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0"
          >
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40"
            >
              Intake channel
            </span>

            <div
              className="mt-3 flex items-center gap-3"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary"
              >
                <Radio className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-heading">
                  Manual CRM entry
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Administrator supplied lead data
                </p>
              </div>
            </div>

            <div
              className="mt-5 flex items-center gap-2 border-t border-border pt-4"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-success" />

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
              >
                Admin workspace
              </span>
            </div>
          </div>
        </div>
      </header>

      {/*===== LEAD FORM =====*/}

      <CreateLeadForm />
    </div>
  );
}
