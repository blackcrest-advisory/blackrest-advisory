import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getFromAddress() {
  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured");
  }

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

export async function sendWelcomeEmail(
  to: string,
  name: string,
): Promise<void> {
  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: "Welcome to Blackcrest Advisory",
      html: `<p>Welcome to Blackcrest Advisory, ${escapeHtml(name)}.</p><p>Your account is ready. You can now log in to your dashboard.</p>`,
    });

    if (error) {
      throw error;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function sendNewLeadAlert(
  name: string,
  email: string,
  problem: string,
): Promise<void> {
  try {
    const from = getFromAddress();
    const { error } = await resend.emails.send({
      from,
      to: from,
      subject: `New Lead: ${name}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Problem:</strong> ${escapeHtml(problem)}</p>`,
    });

    if (error) {
      throw error;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function sendConsultationConfirmation(
  to: string,
  name: string,
  scheduledAt: string,
  type: string,
): Promise<void> {
  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: "Consultation Confirmed",
      html: `<p>Hello ${escapeHtml(name)},</p><p>Your consultation is confirmed.</p><p><strong>Date and time:</strong> ${escapeHtml(scheduledAt)}</p><p><strong>Consultation type:</strong> ${escapeHtml(type)}</p>`,
    });

    if (error) {
      throw error;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function sendProposalNotification(
  to: string,
  name: string,
  amount: number,
  currency: string,
): Promise<void> {
  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: "You have a new proposal from Blackcrest",
      html: `<p>Hello ${escapeHtml(name)},</p><p>A new proposal has been sent to you.</p><p><strong>Amount:</strong> ${amount} ${escapeHtml(currency)}</p><p>Please log in to your dashboard to view it.</p>`,
    });

    if (error) {
      throw error;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function sendProjectUpdate(
  to: string,
  name: string,
  projectTitle: string,
  update: string,
): Promise<void> {
  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: `Project Update: ${projectTitle}`,
      html: `<p>Hello ${escapeHtml(name)},</p><p>There is a new update for <strong>${escapeHtml(projectTitle)}</strong>.</p><p>${escapeHtml(update)}</p>`,
    });

    if (error) {
      throw error;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function sendContactFormConfirmation(
  to: string,
  name: string,
): Promise<void> {
  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      subject: "We received your message",
      html: `<p>Thank you for contacting us, ${escapeHtml(name)}.</p><p>The Blackcrest team will be in touch within 24 hours.</p>`,
    });

    if (error) {
      throw error;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
