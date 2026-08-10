import { Comment, Comments } from "../../../types/data.ts";

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
            setComments(
              commentsList
                .map((c) => {
                  if (
                    c.replies !== undefined &&
                    c.replies.some((r) => r.id === comment.id) &&
                    comment.replyingTo !== undefined
                  ) {
                    const newreplies = c.replies.filter(
                      (r) => r.id !== comment.id,
                    );
                    c.replies = newreplies;
                    return c;
                  } else if (c.id === comment.id) {
                    return;
                  } else {
                    return c;
                  }
                })
                .filter((c) => c !== undefined),
            );
          }}
          className="delete"
        >
          YES, DELETE
        </button>
      </div>
    </div>
  );
}
