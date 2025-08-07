"use client";

import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return (
    <button onClick={() => signIn("github")} className="session-button">
      Sign In
    </button>
  );
}

export function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="session-button">
      Sign Out
    </button>
  );
}
