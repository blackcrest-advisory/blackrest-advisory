"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Plus,
  Radar,
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

import { LeadStats } from "@/components/admin-dashboard/leads/LeadStats";
import { LeadFilters } from "@/components/admin-dashboard/leads/LeadFilters";
import { LeadTable } from "@/components/admin-dashboard/leads/LeadTable";

import { Pagination } from "@/components/shared/Pagination";

import {
  convertAdminLead,
  deleteAdminLead,
} from "@/lib/actions/leads/admin-lead.action";

import type { Lead, LeadService } from "@/types/dashboard/admin/leadTypes";

//===== types =====//
interface LeadFiltersState {
  status: string;
  service: string;
  priority: string;
  assigned: string;
}

const LEADS_PER_PAGE = 10;

export function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);

  const [filters, setFilters] = useState<LeadFiltersState>({
    status: "all",
    service: "all",
    priority: "all",
    assigned: "all",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  //===== filtered leads =====//
  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        const term = searchTerm.toLowerCase();

        if (
          term &&
          !lead.companyName.toLowerCase().includes(term) &&
          !lead.contactPerson.toLowerCase().includes(term)
        ) {
          return false;
        }

        if (filters.status !== "all" && lead.status !== filters.status) {
          return false;
        }

        if (
          filters.service !== "all" &&
          !lead.services.includes(filters.service as LeadService)
        ) {
          return false;
        }

        if (filters.priority !== "all" && lead.priority !== filters.priority) {
          return false;
        }

        return (
          filters.assigned === "all" || lead.assignedTo === filters.assigned
        );
      }),
    [leads, searchTerm, filters],
  );

  //===== pagination =====//
  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / LEADS_PER_PAGE),
  );

  const activePage = Math.min(currentPage, totalPages);

  const paginatedLeads = useMemo(() => {
    const startIndex = (activePage - 1) * LEADS_PER_PAGE;

    return filteredLeads.slice(startIndex, startIndex + LEADS_PER_PAGE);
  }, [activePage, filteredLeads]);

  //===== handlers =====//
  const handleFilterChange = (newFilters: LeadFiltersState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleConvert = async (lead: Lead) => {
    try {
      const convertedLead = await convertAdminLead(lead.id);

      setLeads((previous) =>
        previous.map((item) =>
          item.id === convertedLead.id ? convertedLead : item,
        ),
      );

      toast.success(`${lead.companyName} converted to client!`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to convert lead",
      );
    }
  };

  const handleDelete = async () => {
    if (!leadToDelete) return;

    setIsDeleting(true);

    try {
      await deleteAdminLead(leadToDelete.id);

      setLeads((previous) =>
        previous.filter((item) => item.id !== leadToDelete.id),
      );

      setLeadToDelete(null);

      toast.success("Lead deleted");
    } catch {
      toast.error("Failed to delete lead");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative space-y-6">
      {/*===== LEADS COMMAND HEADER =====*/}

      <motion.section
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 10,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-[340px] w-[340px] rounded-full bg-secondary/[0.07] blur-[110px]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.05] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "110px 110px",
            maskImage:
              "linear-gradient(to right, transparent, black 38%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 38%, black)",
          }}
        />

        {/* top signal */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"/>

        <div className="relative z-10 grid gap-8 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch lg:px-8 lg:py-8">
          {/*===== LEFT =====*/}

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Radar className="h-3.5 w-3.5 text-secondary" />

                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    Commercial pipeline
                  </span>
                </div>

                <span className="h-px w-8 bg-secondary/30" />

                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/40">
                  Admin / CRM
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-heading sm:text-4xl">
                Leads
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Manage the Blackcrest acquisition pipeline, qualify incoming
                opportunities, assign ownership, and convert qualified leads
                into clients.
              </p>
            </div>

            {/* metadata */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                    Pipeline active
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <UsersRound className="h-3.5 w-3.5 text-secondary" />

                  <span className="text-xs text-muted-foreground">
                    {leads.length} total leads
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <Search className="h-3.5 w-3.5 text-secondary" />

                  <span className="text-xs text-muted-foreground">
                    {filteredLeads.length} currently visible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*===== COMMAND PANEL =====*/}

          <div className="relative overflow-hidden border border-secondary/15 bg-secondary/[0.025] p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-secondary/[0.08] blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-secondary" />

                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                      Pipeline command
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold tracking-[-0.025em] text-heading">
                    Capture a new opportunity
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Add a lead manually and begin qualification immediately.
              </p>

              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push("/admin/dashboard/leads/new")}
                className="group mt-5 w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Lead
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
              </Button>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                    CRM online
                  </span>
                </div>

                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-secondary">
                  BCR
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/*===== LEAD STATS =====*/}

      <motion.section initial="hidden" animate="visible">
        <LeadStats leads={leads} />
      </motion.section>

      {/*===== PIPELINE WORKSPACE =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* accent */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

        {/*===== FILTER HEADER =====*/}

        <div className="border-b border-border px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Pipeline control
                </span>

                <span className="h-px w-8 bg-secondary/30" />
              </div>

              <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
                Lead Directory
              </h2>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Search, segment, qualify, convert, and manage leads from one
                operational workspace.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 border border-border bg-background/60 px-3 py-2">
              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Showing
              </span>

              <span className="h-3 w-px bg-border" />

              <span className="text-xs font-semibold text-heading">
                {filteredLeads.length}
              </span>
            </div>
          </div>
        </div>

        {/*===== FILTERS =====*/}

        <div className="border-b border-border bg-muted/10 px-5 py-4 sm:px-6">
          <LeadFilters
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </div>

        {/*===== TABLE =====*/}

        <div>
          <LeadTable
            leads={paginatedLeads}
            onView={(lead) => router.push(`/admin/dashboard/leads/${lead.id}`)}
            onEdit={(lead) =>
              router.push(`/admin/dashboard/leads/${lead.id}?edit=true`)
            }
            onConvert={handleConvert}
            onDelete={setLeadToDelete}
          />
        </div>

        {/*===== PAGINATION FOOTER =====*/}

        <div className="border-t border-border bg-muted/15 px-5 py-4 sm:px-6">
          <Pagination
            currentPage={activePage}
            totalItems={filteredLeads.length}
            pageSize={LEADS_PER_PAGE}
            itemLabel="leads"
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {/*===== DELETE CONFIRMATION =====*/}

      <ConfirmationModal
        isOpen={Boolean(leadToDelete)}
        onClose={() => setLeadToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        description={`Are you sure you want to delete "${
          leadToDelete?.companyName ||
          leadToDelete?.contactPerson ||
          "this lead"
        }"? This action cannot be undone.`}
        confirmLabel="Delete"
        isPending={isDeleting}
      />
    </div>
  );
}
