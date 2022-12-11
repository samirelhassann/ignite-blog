import react, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { formatDistanceToNow } from "date-fns";
import enAU from "date-fns/esm/locale/en-AU";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface CommentModel {
  name: string;
  time: Date;
  comment: string;
}

interface Content {
  type: string;
  content: string;
}

interface Props {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post({ author, content, publishedAt }: Props) {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [comment, setComment] = useState("");

  const isNewCommentEmpty = comment.trim().length === 0;
  const relativePublishedDate = formatDistanceToNow(publishedAt, {
    locale: enAU,
    addSuffix: true,
  });

  const handleNewComment = (event: FormEvent) => {
    event.preventDefault();

    setComments([
      ...comments,
      {
        name: "Samir El Hassan",
        time: new Date(),
        comment: comment.trim(),
      } as CommentModel,
    ]);

    setComment("");
  };

  const deleteCommentAction = (commentToDelete: string) => {
    setComments(
      [...comments].filter((comment) => comment.comment !== commentToDelete)
    );
  };

  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity("");
    setComment(event.target.value);
  };

  const handleNewCommentInvalid = (
    event: InvalidEvent<HTMLTextAreaElement>
  ) => {
    event.target.setCustomValidity("You need to insert any information here!");
  };

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar imgSrc="https://github.com/samirelhassann.png" />
          <div className={styles.authorDescription}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time>{relativePublishedDate}</time>
      </header>

      <div className={styles.content}>
        {content
          .filter((post) => post.type === "paragraph")
          .map((paragraph) => {
            return <p key={paragraph.content}>{paragraph.content}</p>;
          })}

        {content.filter((post) => post.type === "link").length > 0 && (
          <p>
            {content
              .filter((post) => post.type === "link")
              .map((link) => {
                return (
                  <a href="#" key={link.content}>
                    {link.content}
                  </a>
                );
              })}
          </p>
        )}
      </div>

      <form onSubmit={handleNewComment} className={styles.commentForm}>
        <strong>Leave your comment</strong>
        <textarea
          placeholder="Leave your comment here"
          value={comment}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publish
          </button>
        </footer>
      </form>

      <div className={styles.commentsList}>
        {comments.map((c) => {
          return (
            <Comment
              key={c.comment}
              name={c.name}
              time={c.time}
              content={c.comment}
              onDeleteComment={deleteCommentAction}
            />
          );
        })}
      </div>
    </article>
  );
}
