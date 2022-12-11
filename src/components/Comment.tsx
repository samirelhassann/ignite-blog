import react, { useState } from "react";

import { ThumbsUp, Trash } from "phosphor-react";
import { formatDistanceToNow } from "date-fns";
import enAU from "date-fns/esm/locale/en-AU";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface Props {
  name: string;
  time: Date;
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ name, time, content, onDeleteComment }: Props) {
  const [likeCount, setLikeCount] = useState(0);

  const relativePublishedDate = formatDistanceToNow(time, {
    locale: enAU,
    addSuffix: true,
  });

  const handleIncrementLike = () => {
    setLikeCount((state) => {
      return state + 1;
    });
  };

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  return (
    <div className={styles.comment}>
      <Avatar hasNoBorder imgSrc="https://github.com/samirelhassann.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{name}</strong>
              <time>{relativePublishedDate}</time>
            </div>

            <button onClick={handleDeleteComment} title="Delete the comment">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleIncrementLike}>
            <ThumbsUp />
            Cheer <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
