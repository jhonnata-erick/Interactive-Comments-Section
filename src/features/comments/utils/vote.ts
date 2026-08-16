import { Comment, Comments } from "../../../types/data.ts";

export const vote = (
  comment: Comment,
  commentsList: Comments,
  type: "up" | "down",
) => {
  const newCommentsList = commentsList.map((c) => {
    if (c.id === comment.id) {
      if (type === "up") {
        return { ...comment, ["score"]: comment.score + 1 };
      } else {
        return { ...comment, ["score"]: comment.score - 1 };
      }
    } else if (c.replies?.some((r) => r.id === comment.id)) {
      if (type === "up") {
        const newReplies = c.replies.map((r) => {
          return r.id === comment.id
            ? { ...comment, ["score"]: comment.score + 1 }
            : r;
        });
        return { ...c, ["replies"]: newReplies };
      } else {
        const newReplies = c.replies.map((r) => {
          return r.id === comment.id
            ? { ...comment, ["score"]: comment.score - 1 }
            : r;
        });
        return { ...c, ["replies"]: newReplies };
      }
    } else {
      return c;
    }
  });
  return newCommentsList;
};
