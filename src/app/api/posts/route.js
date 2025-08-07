import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { uploadToCloudinaryServer } from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  return NextResponse.json(posts);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const content = formData.get("content");
  const image = formData.get("image");

  let imageUrl = "";
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}_${image.name}`;
    imageUrl = await uploadToCloudinaryServer(buffer, filename);
  }

  const post = await prisma.post.create({
    data: {
      content,
      image: imageUrl,
      user: { connect: { email: session.user.email } },
    },
  });

  return NextResponse.json(post);
}
