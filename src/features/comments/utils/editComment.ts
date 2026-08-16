import { Comment, Comments } from "../../../types/data.ts";

export const editComment = (
  comment: Comment,
  commentsList: Comments,
  newContent: string,
) => {
  if (newContent.trim() !== "") {
    const newCommentsList = commentsList.map((c) => {
      if (c.id === comment.id) {
        const newComment = { ...comment, ["content"]: newContent.trim() };
        return newComment;
      } else if (c.replies?.some((r) => r.id === comment.id)) {
        const newReplies = c.replies.map((r) => {
          return r.id === comment.id
            ? { ...r, ["content"]: newContent.trim() }
            : r;
        });
        const newComment = { ...c, ["replies"]: newReplies };
        return newComment;
      } else {
        return c;
      }
    });
    return newCommentsList;
  } else {
    return commentsList;
  }
};
