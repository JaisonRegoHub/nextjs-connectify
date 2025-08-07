import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinaryServer } from "@/lib/cloudinary";

export async function GET() {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  let currentUser = null;
  if (currentUserEmail) {
    currentUser = await prisma.user.findUnique({
      where: { email: currentUserEmail },
    });
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      likes: true,
    },
  });

  const enrichedPosts = posts.map((post) => {
    const likeCount = post.likes.length;
    const likedByCurrentUser = currentUser
      ? post.likes.some((like) => like.userId === currentUser.id)
      : false;

    return {
      ...post,
      likeCount,
      likedByCurrentUser,
    };
  });

  return NextResponse.json(enrichedPosts);
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
      author: { connect: { email: session.user.email } },
    },
  });

  return NextResponse.json(post);
}
