import { useState } from "react";
import { Comments, Comment } from "../../../types/data.ts";

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
  const [editData, setFormData] = useState(comment.content);
  return (
    <div className="editing-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const content = editData.trim();
          setComments(
            commentsList.map((c) => {
              if (c.id === comment.id) {
                c.content = content;
                return c;
              } else if (c.replies) {
                c.replies = c.replies.map((r) => {
                  if (r.id === comment.id) {
                    r.content = content;
                    return r;
                  } else {
                    return r;
                  }
                });
                return c;
              } else {
                return c;
              }
            }),
          );
          setEditing("idle");
        }}
      >
        <textarea
          onChange={(e) => {
            setFormData(e.target.value);
          }}
          value={editData}
        />
        <button type="submit" className="confirm">
          UPDATE
        </button>
      </form>
    </div>
  );
}
