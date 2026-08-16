import { useState } from "react";
import { Comments, User } from "../../../types/data.ts";
import { addComment } from "../utils/addComment.ts";

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
            addComment(commentsList, newComment, setComments);
          }}
          className="commentForm"
        >
          <img src={currentUser.image.webp} />
          <input
            onChange={(e) => {
              setNewComment({
                ...newComment,
                ["content"]: e.target.value.trim(),
              });
            }}
            id="comment-input"
            className="commentInput"
            type="text"
            placeholder="Add a comment..."
            value={newComment.content}
          />

          <button type="submit" className="confirm">
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}
