import "../../styles/globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Connectify",
  description: "Connect with the world in real time",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background-overlay"></div>
        <SessionProvider session={session}>
          <main className="main-content">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
