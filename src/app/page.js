import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserMenu from "@/components/UserMenu/UserMenu";
import FeedWrapper from "@/components/FeedWrapper/FeedWrapper";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="animated-title">Connectify</h1>
        {session && <UserMenu />}
      </div>

      <FeedWrapper session={session} />
    </main>
  );
}
