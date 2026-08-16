import { useState } from "react";
import { Comment, Comments, User } from "../../../types/data.ts";
import { addReply } from "../utils/addReply.ts";

export function ReplyComment({
  setReplying,
}: {
  setReplying: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
}) {
  return (
    <button onClick={() => setReplying("replying")} className="replyButton">
      <img src="images/icon-reply.svg" alt="" />
      Reply
    </button>
  );
}
export function ReplyingContainer({
  commentsList,
  comment,
  setReplying,
  setComments,
  currentUser,
}: {
  commentsList: Comments;
  comment: Comment;
  setReplying: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  currentUser: User;
}) {
  const [replyForm, setFormData] = useState({
    id: 0,
    content: "",
    createdAt: "",
    score: 0,
    replyingTo: comment.user.username,
    user: currentUser,
  });
  return (
    <section className="body">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setComments(addReply(comment, replyForm, commentsList));
          setReplying("idle");
        }}
        className="replying-container"
      >
        <div className="">
          <img src={currentUser?.image.webp} alt="" />
        </div>
        <input
          onChange={(e) => {
            const date = new Date().toISOString();
            setFormData({
              ...replyForm,
              ["id"]: Date.now(),
              ["createdAt"]: date,
              [e.target.id]: e.target.value.trim(),
            });
          }}
          id="content"
          ref={(e: HTMLInputElement | null) => {
            if (e) {
              e.focus();
            }
          }}
          type="text"
        />
        <button type="submit" className="confirm">
          REPLY
        </button>
        <button
          type="button"
          onClick={() => {
            setReplying("idle");
          }}
          className="cancel"
        >
          Cancel
        </button>
      </form>
    </section>
  );
}
