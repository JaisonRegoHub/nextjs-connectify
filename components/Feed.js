"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6 mt-6">
      {posts.length === 0 ? (
        <div className="text-center text-slate-400 mt-10">
          <p className="text-lg font-medium">
            Your feed is quiet... for now 🧘
          </p>
          <p className="mt-1 text-sm">Start a post and bring it to life!</p>
          <img
            src="https://illustrations.popsy.co/gray/empty.png"
            alt="Empty feed"
            className="w-52 mx-auto mt-6 opacity-60"
          />
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-zinc-800 p-4 rounded-xl text-white shadow-md"
          >
            <div className="flex items-center mb-2 gap-2">
              {post.author?.image && (
                <img
                  src={post.author.image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="font-medium text-red-500">
                {post.author?.name || "Anonymous"}
              </span>
            </div>
            <p className="mb-2 whitespace-pre-wrap">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post image"
                className="w-full rounded-md mb-2"
              />
            )}
            <p className="text-sm text-zinc-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
