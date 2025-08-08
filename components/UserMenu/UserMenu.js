"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) return null;

  const { user } = session;
  const firstLetter =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "?";

  return (
    <div ref={menuRef} className={styles.wrapper}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={styles.avatarButton}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt="avatar"
            width={40}
            height={40}
            className={styles.avatarImage}
          />
        ) : (
          firstLetter
        )}
      </button>
      {open && (
        <div className={styles.menu}>
          <button onClick={() => signOut()} className={styles.menuItem}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
