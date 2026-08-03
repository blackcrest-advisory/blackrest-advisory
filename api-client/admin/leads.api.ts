import client from "@/api-client/base.axios";
import type { Lead } from "@/types/dashboard/admin/leadTypes";

export async function fetchAdminLeads(): Promise<Lead[]> {
  const response = await client.get<Lead[]>("/api/admin/leads");
  return response.data;
}

export async function updateAdminLead(
  id: string,
  lead: Partial<Lead>,
): Promise<Lead> {
  const response = await client.patch<Lead>(`/api/admin/leads/${id}`, lead);
  return response.data;
}

export async function deleteAdminLead(id: string): Promise<void> {
  await client.delete(`/api/admin/leads/${id}`);
}

export async function convertAdminLead(id: string): Promise<Lead> {
  return updateAdminLead(id, { status: "won" });
}
