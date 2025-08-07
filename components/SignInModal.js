// components/SignInModal.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle, FaFacebook, FaDiscord } from "react-icons/fa";

export default function SignInModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
      >
        Sign In
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-slate-900 text-white rounded-xl p-6 w-80 relative border border-zinc-700 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Sign in to Connectify
            </h2>

            <div className="space-y-2">
              <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="flex items-center gap-3 w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md"
              >
                <FaGithub />
                Continue with GitHub
              </button>

              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex items-center gap-3 w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md"
              >
                <FaGoogle />
                Continue with Google
              </button>

              <button
                disabled
                className="flex items-center gap-3 w-full px-4 py-2 bg-zinc-800 text-zinc-500 rounded-md cursor-not-allowed"
              >
                <FaFacebook />
                Facebook (coming soon)
              </button>

              <button
                disabled
                className="flex items-center gap-3 w-full px-4 py-2 bg-zinc-800 text-zinc-500 rounded-md cursor-not-allowed"
              >
                <FaDiscord />
                Discord (coming soon)
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-zinc-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
