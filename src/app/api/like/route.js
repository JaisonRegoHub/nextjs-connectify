import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const likeWhere = { userId_postId: { userId: user.id, postId } };
  const existingLike = await prisma.like.findUnique({ where: likeWhere });

  if (existingLike) {
    await prisma.like.delete({ where: likeWhere });
    return NextResponse.json({ liked: false });
  }

  await prisma.like.create({
    data: { userId: user.id, postId },
  });

  return NextResponse.json({ liked: true });
}
