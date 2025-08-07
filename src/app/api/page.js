import PostForm from "@/components/PostForm";
import Feed from "@/components/Feed";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { SignInButton, SignOutButton } from "@/components/SessionButtons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Connectify</h1>
        <div>{session ? <SignOutButton /> : <SignInButton />}</div>
      </div>
      {session && <PostForm />}
      <Feed />
    </main>
  );
}
