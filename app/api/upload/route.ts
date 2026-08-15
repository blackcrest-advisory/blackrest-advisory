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
  const requestedBucket = formData.get("bucket");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedBuckets = new Set(["blackcrest-files", "briefs"]);
  const bucketName =
    typeof requestedBucket === "string" && requestedBucket
      ? requestedBucket
      : "blackcrest-files";

  if (!allowedBuckets.has(bucketName)) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
  }

  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${user.id}/${Date.now()}-${crypto.randomUUID()}-${safeFileName}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const bucket = supabaseAdmin.storage.from(bucketName);
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
