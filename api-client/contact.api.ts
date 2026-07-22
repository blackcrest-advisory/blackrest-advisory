import axios from "@/api-client/client";

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  pillar?: string;
  problem: string;
};

type ContactFormResponse = {
  success: true;
};

export async function submitContactForm({
  name,
  email,
  phone,
  companyName,
  pillar,
  problem,
}: ContactFormData) {
  const response = await axios.post<ContactFormResponse>("/api/contact", {
    name,
    email,
    phone,
    companyName,
    pillar,
    problem,
    source: "Contact Form",
  });

  return response.data;
}
