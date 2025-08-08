"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PostForm.module.css";

export default function PostForm({ onPostCreated }) {
  const { data: session } = useSession();
  const { register, handleSubmit, reset, formState } = useForm();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onSubmit = async ({ content }) => {
    if (!session) return;

    const formData = new FormData();
    formData.append("content", content);
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post("/api/posts", formData);
      reset();
      setFile(null);
      setPreview(null);
      onPostCreated?.();
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    }

    e.target.value = null;
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
