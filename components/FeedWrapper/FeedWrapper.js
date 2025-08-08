"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Feed from "@/components/FeedWrapper/Feed/Feed";
import PostForm from "@/components/FeedWrapper/PostForm/PostForm";
import Image from "next/image";
import SignInModal from "@/components/FeedWrapper/SignInModal/SignInModal";

export default function FeedWrapper({ session }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts");
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {session ? (
        <PostForm onPostCreated={fetchPosts} />
      ) : (
        <div className="bg-slate-800 text-slate-400 rounded-xl p-6 text-center mb-6 shadow-md border border-zinc-700">
          <h2 className="text-lg font-semibold mb-2">
            Want to post something?
          </h2>
          <p className="text-sm text-zinc-400 mb-4">
            Sign in to start posting and join the conversation!
          </p>
          <Image
            src="/empty-feed-2.jpg"
            alt="Sign in to post"
            width={300}
            height={200}
            className="mx-auto rounded-md opacity-70 mb-4"
          />
          <SignInModal />
        </div>
      )}
      <Feed posts={posts} setPosts={setPosts} />
    </>
  );
}
