import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { prisma } from "@/lib/db/client";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const file = await prisma.file.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!file) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { error } = await supabaseAdmin.storage
      .from("blackcrest-files")
      .remove([file.path]);

    if (error) {
      throw error;
    }

    await prisma.file.delete({
      where: {
        id: file.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
