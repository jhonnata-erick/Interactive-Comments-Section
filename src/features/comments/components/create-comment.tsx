import { useState } from "react";
import { Comments, User } from "../../../types/data.ts";

export function CreateComment({
  commentsList,
  setComments,
  currentUser,
}: {
  commentsList: Comments;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  currentUser: User;
}) {
  const [newComment, setNewComment] = useState({
    id: 0,
    content: "",
    createdAt: "",
    score: 0,
    replies: [],
    user: currentUser,
  });
  return (
    <section className="create-comment">
      <div className="AddCommentBox">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setComments([...commentsList, newComment]);
            setNewComment({
              ...newComment,
              ["content"]: "",
            });
          }}
          className="commentForm"
        >
          <input
            onChange={(e) => {
              const date = new Date().toISOString();
              setNewComment({
                ...newComment,
                ["content"]: e.target.value.trim(),
                ["id"]: Date.now(),
                ["createdAt"]: date,
              });
            }}
            id="comment-input"
            className="commentInput"
            type="text"
            placeholder="Add a comment..."
            value={newComment.content}
          />
          <img src={currentUser.image.webp} />
          <button type="submit" className="confirm">
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}
