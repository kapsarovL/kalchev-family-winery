import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

async function requireAdmin(request: NextRequest): Promise<boolean> {
  const adminCookie = request.cookies.get("admin_authenticated")?.value;
  return adminCookie === "true";
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "uploads", "evidence");
    await mkdir(uploadDir, { recursive: true });

    const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/evidence/${uniqueName}` });
  } catch {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}