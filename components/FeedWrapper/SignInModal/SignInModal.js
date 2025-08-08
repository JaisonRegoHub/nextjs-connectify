"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle, FaFacebook, FaDiscord } from "react-icons/fa";
import styles from "./SignInModal.module.css";

export default function SignInModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles.signInBtn}>
        Sign In
      </button>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2 className={styles.title}>Sign in to Connectify</h2>

            <div className={styles.providers}>
              <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className={styles.providerBtn}
              >
                <FaGithub />
                Continue with GitHub
              </button>

              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className={styles.providerBtn}
              >
                <FaGoogle />
                Continue with Google
              </button>

              <button disabled className={styles.disabledBtn}>
                <FaFacebook />
                Facebook (coming soon)
              </button>

              <button disabled className={styles.disabledBtn}>
                <FaDiscord />
                Discord (coming soon)
              </button>
            </div>

            <button onClick={() => setOpen(false)} className={styles.closeBtn}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
