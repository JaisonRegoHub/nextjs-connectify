"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function PostForm({ onPostCreated }) {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    if (!session) return;

    const formData = new FormData();
    formData.append("content", data.content);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    await axios.post("/api/posts", formData);
    reset();
    setPreview(null);
    onPostCreated?.();
  };

  if (!session) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-slate-800 p-5 rounded-xl space-y-4 shadow-2xl"
    >
      <textarea
        {...register("content", { required: true })}
        placeholder="What's happening?"
        className="w-full bg-slate-700 p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
      ></textarea>

      <input
        type="file"
        accept="image/*"
        {...register("image")}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="text-sm text-white file:bg-indigo-500 file:text-white file:rounded-md file:px-4 file:py-2 hover:file:bg-indigo-600"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full rounded-md border border-slate-700"
        />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-teal-500 hover:bg-teal-600 transition duration-200 text-white font-semibold py-2 px-6 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Posting…" : "Post"}
      </button>
    </form>
  );
}
