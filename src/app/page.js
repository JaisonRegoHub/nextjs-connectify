import PostForm from "@/components/PostForm";
import Feed from "@/components/Feed";
import { getServerSession } from "next-auth";
import Image from "next/image";
import UserMenu from "@/components/UserMenu";
import SignInModal from "@/components/SignInModal";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="animated-title">Connectify</h1>
        {session && <UserMenu />}
      </div>

      {session ? (
        <PostForm />
      ) : (
        <div className="bg-slate-800 text-slate-400 rounded-xl p-6 text-center mb-6 shadow-md border border-zinc-700">
          <h2 className="text-lg font-semibold mb-2">
            Want to post something?
          </h2>
          <p className="text-sm text-zinc-400 mb-4">
            Sign in to start posting and join the conversation!
          </p>
          <Image
            src="/empty-feed-2.jpg"
            alt="Sign in to post"
            width={300}
            height={200}
            className="mx-auto rounded-md opacity-70 mb-4"
          />
          <SignInModal />
        </div>
      )}

      <Feed />
    </main>
  );
}
