import { Comment, Comments } from "../../../types/data.ts";
import { deleteComment } from "../utils/deleteComment.ts";

export function DeleteComment({
  setDeleting,
}: {
  setDeleting: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
}) {
  return (
    <button
      onClick={() => {
        setDeleting("deleting");
      }}
      className="deleteComment"
    >
      <img src="images/icon-delete.svg" alt="" />
    </button>
  );
}
export function DeleteModal({
  comment,
  setComments,
  commentsList,
  setDeleting,
}: {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  commentsList: Comments;
  setDeleting: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
}) {
  return (
    <div className="body modal-comment-delete">
      <h2>Delete comment</h2>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="buttons">
        <button
          onClick={() => {
            setDeleting("idle");
          }}
          className="cancel"
        >
          NO, CANCEL
        </button>
        <button
          onClick={() => {
            setComments(deleteComment(comment, commentsList));
          }}
          className="delete"
        >
          YES, DELETE
        </button>
      </div>
    </div>
  );
}
