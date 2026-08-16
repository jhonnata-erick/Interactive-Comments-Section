import { useState } from "react";
import { Comments, Comment } from "../../../types/data.ts";
import { editComment } from "../utils/editComment.ts";

export function EditComment({
  setEditing,
  commentState,
}: {
  setEditing: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
  commentState: string;
}) {
  return (
    <button
      onClick={() => {
        if (commentState !== "editing") {
          setEditing("editing");
        } else {
          setEditing("idle");
        }
      }}
      className="edit"
    >
      <img src="images/icon-edit.svg" alt="" />
      <p>Edit</p>
    </button>
  );
}
export function EditingContainer({
  comment,
  setComments,
  commentsList,
  setEditing,
}: {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  commentsList: Comments;
  setEditing: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
}) {
  const [newContent, setFormData] = useState(comment.content);
  return (
    <div className="editing-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newCommentsList = editComment(
            comment,
            commentsList,
            newContent,
          );
          setComments(newCommentsList);
          setEditing("idle");
        }}
      >
        <textarea
          onChange={(e) => {
            setFormData(e.target.value);
          }}
          value={newContent.trim()}
        />
        <button type="submit" className="confirm">
          UPDATE
        </button>
      </form>
    </div>
  );
}
