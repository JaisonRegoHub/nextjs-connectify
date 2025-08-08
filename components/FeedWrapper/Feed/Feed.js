"use client";

import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import styles from "./Feed.module.css";

export default function Feed({ posts, setPosts }) {
  const toggleLike = async (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likedByCurrentUser: !p.likedByCurrentUser,
              likeCount: (p.likeCount ?? 0) + (p.likedByCurrentUser ? -1 : 1),
            }
          : p
      )
    );

    try {
      const { data } = await axios.post("/api/like", { postId });
      if (
        typeof data.liked === "boolean" &&
        typeof data.likeCount === "number"
      ) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  likedByCurrentUser: data.liked,
                  likeCount: data.likeCount,
                }
              : p
          )
        );
      }
    } catch {
      // revert on error
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                likedByCurrentUser: !p.likedByCurrentUser,
                likeCount: (p.likeCount ?? 0) + (p.likedByCurrentUser ? -1 : 1),
              }
            : p
        )
      );
    }
  };

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
        }) => (
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
                <div className={styles.avatarFallback}>
                  {author?.name?.[0] || "?"}
                </div>
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
              >
                {likedByCurrentUser ? (
                  <FaHeart className={styles.likedIcon} />
                ) : (
                  <FaRegHeart className={styles.unlikedIcon} />
                )}
                <span>{Number(likeCount ?? 0)}</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
