"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import {
  TeamMember,
  ClientContact,
} from "@/types/dashboard/client/projectsType";

interface ProjectTeamCardProps {
  assignedTeam: TeamMember[];
  clientContact: ClientContact;
}

export const ProjectTeamCard = ({
  assignedTeam,
  clientContact,
}: ProjectTeamCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold text-[var(--color-heading)]">
        Team
      </h2>

      {/* Assigned team members */}
      <div className="flex flex-col gap-3">
        {assignedTeam.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-xs font-semibold text-secondary">
              {member.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-heading)]">
                {member.name}
              </p>
              {member.role && (
                <p className="text-xs text-[var(--color-body)]">
                  {member.role}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Client contact */}
      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--color-body)]">
          Client Contact
        </p>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {clientContact.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-heading)]">
              {clientContact.name}
            </p>
            <p className="text-xs text-[var(--color-body)]">
              {clientContact.email}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
