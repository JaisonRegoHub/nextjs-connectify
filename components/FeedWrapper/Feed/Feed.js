"use client";

import Image from "next/image";
import apiClient from "@/lib/apiClient";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import styles from "./Feed.module.css";

export default function Feed({ posts, setPosts }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts) {
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [posts]);

  const toggleLike = async (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likedByCurrentUser: !post.likedByCurrentUser,
              likeCount:
                (post.likeCount ?? 0) + (post.likedByCurrentUser ? -1 : 1),
            }
          : post
      )
    );

    try {
      const { data } = await apiClient.post("/api/like", { postId });
      if (
        typeof data.liked === "boolean" &&
        typeof data.likeCount === "number"
      ) {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likedByCurrentUser: data.liked,
                  likeCount: data.likeCount,
                }
              : post
          )
        );
      }
    } catch {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedByCurrentUser: !post.likedByCurrentUser,
                likeCount:
                  (post.likeCount ?? 0) + (post.likedByCurrentUser ? -1 : 1),
              }
            : post
        )
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingFeed}>
        <p className={styles.loadingText}>
          Loading posts<span className={styles.dotAnimation}>...</span>
        </p>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className={styles.emptyFeed}>
        <p className={styles.emptyTitle}>Your feed is quiet... for now 🧘</p>
        <p className={styles.emptySubtitle}>
          Start a post and bring it to life!
        </p>
        <div className={styles.emptyImage}>
          <Image
            src="/empty-feed-1.jpg"
            alt="Empty feed"
            width={800}
            height={600}
            className={styles.imageRounded}
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedContainer}>
      {posts.map(
        ({
          id,
          author,
          content,
          image,
          createdAt,
          likedByCurrentUser,
          likeCount,
        }) => {
          const authorInitial = author?.name?.[0] || "?";

          return (
            <div key={id} className={styles.postCard}>
              <div className={styles.authorRow}>
                {author?.image ? (
                  <Image
                    src={author.image}
                    alt="avatar"
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarFallback}>{authorInitial}</div>
                )}
                <span className={styles.authorName}>
                  {author?.name || "Anonymous"}
                </span>
              </div>

              <p className={styles.postContent}>{content}</p>

              {image && (
                <div className={styles.postImageWrapper}>
                  <Image
                    src={image}
                    alt="Post image"
                    width={800}
                    height={600}
                    className={styles.postImage}
                  />
                </div>
              )}

              <div className={styles.postFooter}>
                <p className={styles.postDate}>
                  {new Date(createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => toggleLike(id)}
                  className={styles.likeButton}
                  aria-label={likedByCurrentUser ? "Unlike post" : "Like post"}
                >
                  {likedByCurrentUser ? (
                    <FaHeart className={styles.likedIcon} />
                  ) : (
                    <FaRegHeart className={styles.unlikedIcon} />
                  )}
                  <span>{likeCount ?? 0}</span>
                </button>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
