"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  if (!session?.user) return null;

  const user = session.user;
  const firstLetter =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "?";

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full border border-zinc-600 bg-slate-700 text-white font-bold flex items-center justify-center overflow-hidden"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          firstLetter
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-slate-800 text-white rounded-xl shadow-md border border-zinc-700 py-1 z-50">
          <button
            onClick={() => signOut()}
            className="w-full text-left px-3 py-1.5 hover:bg-zinc-700 text-sm rounded-md"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
