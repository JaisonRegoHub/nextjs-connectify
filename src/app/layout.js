// app/layout.js
import "../../styles/globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <div className="fixed inset-0 z-0 animate-gradient bg-gradient-to-br from-[#1e1e2f] via-[#3a3a5f] to-[#1e1e2f] bg-[length:400%_400%]"></div>

        <div className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm"></div>

        <SessionProvider session={session}>
          <main className="relative z-20">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
