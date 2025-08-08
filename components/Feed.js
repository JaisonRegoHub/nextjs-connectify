"use client";

import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

export default function Feed({ posts, setPosts }) {
  const toggleLike = async (postId) => {
    let originalLiked = false;
    let originalCount = 0;

    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === postId);
      if (idx === -1) return prev;
      originalLiked = !!prev[idx].likedByCurrentUser;
      originalCount = Number(prev[idx].likeCount ?? 0);
      const optimisticLiked = !originalLiked;
      const optimisticCount = originalCount + (optimisticLiked ? 1 : -1);
      return prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likedByCurrentUser: optimisticLiked,
              likeCount: optimisticCount,
            }
          : p
      );
    });

    try {
      const res = await axios.post("/api/like", { postId });
      const likedFromServer =
        typeof res.data?.liked === "boolean" ? res.data.liked : undefined;
      const countFromServer =
        typeof res.data?.likeCount === "number"
          ? res.data.likeCount
          : undefined;
      const finalLiked =
        likedFromServer === undefined ? !originalLiked : likedFromServer;
      const finalCount =
        countFromServer !== undefined
          ? countFromServer
          : originalCount + ((finalLiked ? 1 : 0) - (originalLiked ? 1 : 0));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, likedByCurrentUser: finalLiked, likeCount: finalCount }
            : p
        )
      );
    } catch (err) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                likedByCurrentUser: originalLiked,
                likeCount: originalCount,
              }
            : p
        )
      );
    }
  };

  return (
    <div className="space-y-8 mt-10">
      {!posts || posts.length === 0 ? (
        <div className="text-center text-slate-400 mt-10">
          <p className="text-xl font-semibold">
            Your feed is quiet... for now 🧘
          </p>
          <p className="mt-2 text-sm">Start a post and bring it to life!</p>
          <div className="w-80 mx-auto mt-6 opacity-70">
            <Image
              src="/empty-feed-1.jpg"
              alt="Empty feed"
              width={800}
              height={600}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-800 p-6 rounded-2xl text-white shadow-lg"
          >
            <div className="flex items-center mb-4 gap-3">
              {post.author?.image ? (
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold">
                  {post.author?.name?.[0] || "?"}
                </div>
              )}
              <span className="font-semibold text-red-400">
                {post.author?.name || "Anonymous"}
              </span>
            </div>

            <p className="mb-4 whitespace-pre-wrap text-base">{post.content}</p>

            {post.image && (
              <div className="mb-4">
                <Image
                  src={post.image}
                  alt="Post image"
                  width={800}
                  height={600}
                  className="rounded-lg w-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-2 text-red-400 transition-transform duration-150 active:scale-125"
              >
                {post.likedByCurrentUser ? (
                  <FaHeart className="text-xl animate-pulse" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
                <span className="text-sm">{Number(post.likeCount ?? 0)}</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
