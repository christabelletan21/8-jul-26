import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mintInternalToken } from "@/lib/internalToken";
import { upsertMyProgress } from "@/lib/api";

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const token = mintInternalToken(userId);

  try {
    const enrollment = await upsertMyProgress(token, params.slug, body);
    return NextResponse.json(enrollment);
  } catch {
    return NextResponse.json({ error: "Failed to update progress" }, { status: 502 });
  }
}
