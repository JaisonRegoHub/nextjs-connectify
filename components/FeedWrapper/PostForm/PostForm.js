"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import styles from "./PostForm.module.css";

export default function PostForm({ onPostCreated }) {
  const { data: session } = useSession();
  const { register, handleSubmit, reset, formState } = useForm();
  const [preview, setPreview] = useState(null);

  const onSubmit = async ({ content, image }) => {
    if (!session) return;
    const formData = new FormData();
    formData.append("content", content);
    if (image?.[0]) formData.append("image", image[0]);
    await axios.post("/api/posts", formData);
    reset();
    setPreview(null);
    onPostCreated?.();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  if (!session) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <textarea
        {...register("content", { required: true })}
        placeholder="What's happening?"
        className={styles.textarea}
      />
      <input
        type="file"
        accept="image/*"
        {...register("image")}
        onChange={handleImageChange}
        className={styles.fileInput}
      />
      {preview && (
        <img src={preview} alt="Preview" className={styles.preview} />
      )}
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className={styles.submitBtn}
      >
        {formState.isSubmitting ? "Posting…" : "Post"}
      </button>
    </form>
  );
}
