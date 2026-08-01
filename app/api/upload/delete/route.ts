import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function DELETE(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  const { path } = body as Record<string, unknown>;

  if (typeof path !== "string" || !path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.storage
    .from("blackcrest-files")
    .remove([path]);

  if (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
