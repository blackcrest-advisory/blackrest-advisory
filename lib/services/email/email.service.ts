//===== imports =====//
import { Resend } from "resend";
import { prisma } from "@/lib/db/client";
import { NotificationType } from "@prisma/client";
import { format } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function getFromAddress() {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) throw new Error("RESEND_FROM_EMAIL is not configured");
  return from;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

//===== HTML wrapper for consistent styling =====//
function emailWrapper(content: string, title: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
          .footer { margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px; }
          .button { display: inline-block; padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Blackcrest Advisory</h1>
        </div>
        ${content}
        <div class="footer">
          <p>Blackcrest Advisory &bull; <a href="${APP_URL}">${APP_URL}</a></p>
        </div>
      </body>
    </html>
  `;
}

//===== sendProposalToClient =====//
export async function sendProposalToClient({
  to,
  name,
  proposalId,
  briefTitle,
  amount,
  currency,
}: {
  to: string;
  name: string;
  proposalId: string;
  briefTitle: string;
  amount?: number | null;
  currency?: string;
}) {
  try {
    const amountStr = amount
      ? `${amount} ${currency || "EUR"}`
      : "to be discussed";
    const content = `
      <p>Hello ${escapeHtml(name)},</p>
      <p>We have prepared a proposal for your project: <strong>${escapeHtml(briefTitle)}</strong>.</p>
      <p><strong>Estimated amount:</strong> ${amountStr}</p>
      <p>Please log in to your dashboard to view and respond to the proposal.</p>
      <p>
        <a href="${APP_URL}/client/dashboard/project-requests/${proposalId}" class="button">
          View Proposal
        </a>
      </p>
      <p>We look forward to working with you!</p>
    `;

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: `New Proposal: ${briefTitle}`,
      html: emailWrapper(content, "Proposal Ready"),
    });

    if (error) throw error;
  } catch (error) {
    console.error("sendProposalToClient error:", error);
  }
}

//===== sendProposalAccepted =====//
export async function sendProposalAccepted({
  to,
  adminName,
  clientName,
  briefTitle,
  feedback,
}: {
  to: string;
  adminName: string;
  clientName: string;
  briefTitle: string;
  feedback?: string | null;
}) {
  try {
    const content = `
      <p>Hello ${escapeHtml(adminName)},</p>
      <p><strong>${escapeHtml(clientName)}</strong> has accepted the proposal for <strong>${escapeHtml(briefTitle)}</strong>.</p>
      ${feedback ? `<p><strong>Client feedback:</strong> ${escapeHtml(feedback)}</p>` : ""}
      <p>A project has been automatically created. You can manage it from the admin dashboard.</p>
      <p><a href="${APP_URL}/admin/dashboard/project-requests" class="button">Go to Dashboard</a></p>
    `;

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: `Proposal Accepted: ${briefTitle}`,
      html: emailWrapper(content, "Proposal Accepted"),
    });

    if (error) throw error;
  } catch (error) {
    console.error("sendProposalAccepted error:", error);
  }
}

//===== sendProposalDeclined =====//
export async function sendProposalDeclined({
  to,
  adminName,
  clientName,
  briefTitle,
  declinedReason,
  feedback,
}: {
  to: string;
  adminName: string;
  clientName: string;
  briefTitle: string;
  declinedReason?: string | null;
  feedback?: string | null;
}) {
  try {
    const content = `
      <p>Hello ${escapeHtml(adminName)},</p>
      <p><strong>${escapeHtml(clientName)}</strong> has declined the proposal for <strong>${escapeHtml(briefTitle)}</strong>.</p>
      ${declinedReason ? `<p><strong>Reason:</strong> ${escapeHtml(declinedReason)}</p>` : ""}
      ${feedback ? `<p><strong>Client feedback:</strong> ${escapeHtml(feedback)}</p>` : ""}
      <p>The brief has been closed. You can review it if needed.</p>
    `;

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: `Proposal Declined: ${briefTitle}`,
      html: emailWrapper(content, "Proposal Declined"),
    });

    if (error) throw error;
  } catch (error) {
    console.error("sendProposalDeclined error:", error);
  }
}

//===== sendBriefStatusUpdate =====//
export async function sendBriefStatusUpdate({
  to,
  name,
  briefTitle,
  newStatus,
}: {
  to: string;
  name: string;
  briefTitle: string;
  newStatus: string;
}) {
  try {
    const statusLabel = newStatus.replace(/_/g, " ").toUpperCase();
    const content = `
      <p>Hello ${escapeHtml(name)},</p>
      <p>The status of your project request <strong>${escapeHtml(briefTitle)}</strong> has been updated to:</p>
      <p><strong>${escapeHtml(statusLabel)}</strong></p>
      <p>Log in to your dashboard for more details.</p>
      <p><a href="${APP_URL}/dashboard" class="button">Go to Dashboard</a></p>
    `;

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: `Status Update: ${briefTitle}`,
      html: emailWrapper(content, "Status Update"),
    });

    if (error) throw error;
  } catch (error) {
    console.error("sendBriefStatusUpdate error:", error);
  }
}

//===== Re-export existing functions with improvements =====//
export {
  sendWelcomeEmail,
  sendNewLeadAlert,
  sendConsultationConfirmation,
  sendContactFormConfirmation,
  sendProjectUpdate,
  createNotification,
} from "../email.service";

//===== send invoice notification =====//
export async function sendInvoiceNotification({
  to,
  name,
  invoiceNumber,
  amount,
  currency,
  dueDate,
  projectTitle,
  link,
}: {
  to: string;
  name: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  dueDate: Date | null;
  projectTitle: string;
  link: string;
}) {
  try {
    const content = `
      <p>Hello ${escapeHtml(name)},</p>
      <p>You have received a new invoice <strong>${escapeHtml(invoiceNumber)}</strong> for project <strong>${escapeHtml(projectTitle)}</strong>.</p>
      <p><strong>Amount:</strong> ${amount} ${escapeHtml(currency)}</p>
      ${dueDate ? `<p><strong>Due date:</strong> ${format(new Date(dueDate), "MMMM d, yyyy")}</p>` : ""}
      <p>Please log in to view and pay the invoice.</p>
      <p><a href="${link}" class="button">View Invoice</a></p>
    `;

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: `Invoice ${invoiceNumber} from Blackcrest Advisory`,
      html: emailWrapper(content, "New Invoice"),
    });

    if (error) throw error;
  } catch (error) {
    console.error("sendInvoiceNotification error:", error);
  }
}
