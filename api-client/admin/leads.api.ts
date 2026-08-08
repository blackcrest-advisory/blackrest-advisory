import client from "@/api-client/base.axios";
import type {
  Lead,
  LeadInquiryPayload,
} from "@/types/dashboard/admin/leadTypes";

//create lead response
type CreateLeadInquiryResponse = {
  success: boolean;
  message: string;
};

export async function createLeadInquiry(
  payload: LeadInquiryPayload,
): Promise<CreateLeadInquiryResponse> {
  const response = await client.post<CreateLeadInquiryResponse>(
    "/api/leads",
    payload,
  );
  return response.data;
}

// ============================================
// 3. Admin endpoints (existing)
// ============================================
export async function fetchAdminLeads(): Promise<Lead[]> {
  const response = await client.get<Lead[]>("/api/leads");
  return response.data;
}

export async function updateAdminLead(
  id: string,
  lead: Partial<Lead>,
): Promise<Lead> {
  const response = await client.patch<Lead>(`/api/leads/${id}`, lead);
  return response.data;
}

export async function deleteAdminLead(id: string): Promise<void> {
  await client.delete(`/api/leads/${id}`);
}

export async function convertAdminLead(id: string): Promise<Lead> {
  return updateAdminLead(id, { status: "won" });
}
