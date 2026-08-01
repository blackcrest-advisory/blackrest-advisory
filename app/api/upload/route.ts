import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const path = `${user.id}/${Date.now()}-${file.name}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const bucket = supabaseAdmin.storage.from("blackcrest-files");
  const { error: uploadError } = await bucket.upload(path, buffer, {
    contentType: file.type,
  });

  if (uploadError) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  const { data, error: signedUrlError } = await bucket.createSignedUrl(
    path,
    31536000,
  );

  if (signedUrlError) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl, path }, { status: 200 });
}
