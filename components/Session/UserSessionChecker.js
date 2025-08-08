"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

export default function UserSessionChecker() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      axios.get("/api/auth/check-user").catch((error) => {
        if (error.response?.status === 401) {
          signOut({ callbackUrl: "/" });
        }
      });
    }
  }, [status]);

  return null;
}
