import { Comments, Comment } from "../../../types/data.ts";

export const deleteComment = (comment: Comment, commentsList: Comments) => {
  const newCommentsList = commentsList
    .map((c) => {
      if (comment.id === c.id) {
        return false;
      } else if (c.replies?.some((r) => r.id === comment.id)) {
        const newReplies = c.replies.filter((r) => r.id !== comment.id);
        return { ...c, ["replies"]: newReplies };
      } else {
        return c;
      }
    })
    .filter((c) => c !== false);
  return newCommentsList;
};
