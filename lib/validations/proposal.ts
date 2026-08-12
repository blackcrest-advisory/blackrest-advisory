//===== imports =====//
import { z } from "zod";

//===== Proposal schema (for create/update) =====//
export const proposalSchema = z.object({
  briefId: z.string().min(1, "Brief ID is required"),
  scope: z.string().min(1, "Scope is required"),
  deliverables: z.string().min(1, "Deliverables are required"),
  timeline: z.string().min(1, "Timeline is required"),
  amount: z.number().positive("Amount must be positive").optional(),
  currency: z.string().default("EUR"),
  terms: z.string().optional(),
});

//===== Client response schema (accept/decline) =====//
export const clientProposalResponseSchema = z.object({
  proposalId: z.string().min(1),
  feedback: z.string().optional(),
  declinedReason: z.string().optional(),
});

//===== Brief close schema =====//
export const briefCloseSchema = z.object({
  briefId: z.string().min(1),
  reason: z.string().min(1, "Please provide a reason for closing"),
});

//===== Types =====//
export type ProposalInput = z.infer<typeof proposalSchema>;
export type ClientProposalResponse = z.infer<
  typeof clientProposalResponseSchema
>;
export type BriefCloseInput = z.infer<typeof briefCloseSchema>;
