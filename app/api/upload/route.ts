import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { supabaseAdmin } from "@/lib/supabase/client";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const user = await getCurrentUser();

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

  // Allowed buckets with their access rules
  const bucketConfig: Record<string, { allowed: boolean; public: boolean }> = {
    "blackcrest-files": { allowed: true, public: false },
    briefs: { allowed: true, public: false },
    leads: { allowed: true, public: true },
  };

  const bucketName =
    typeof requestedBucket === "string" && requestedBucket
      ? requestedBucket
      : "blackcrest-files";

  const config = bucketConfig[bucketName];
  if (!config || !config.allowed) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
  }

  // Check authentication for non-public buckets
  if (!config.public && !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Generate file path
  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const userId = user?.id || "public";
  const path = `${bucketName}/${userId}/${Date.now()}-${randomUUID()}-${safeFileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const bucket = supabaseAdmin.storage.from(bucketName);
  const { error: uploadError } = await bucket.upload(path, buffer, {
    contentType: file.type,
  });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  const { data, error: signedUrlError } = await bucket.createSignedUrl(
    path,
    31536000, // 1 year
  );

  if (signedUrlError) {
    console.error("Signed URL error:", signedUrlError);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl, path }, { status: 200 });
}
