import { Comment, Comments } from "../../../types/data.ts";

export const addReply = (
  comment: Comment,
  replyForm: Comment,
  commentsList: Comments,
) => {
  if (comment.replies) {
    const newCommentsList = commentsList.map((c) => {
      return c.id === comment.id
        ? { ...comment, ["replies"]: [...comment.replies!, replyForm] }
        : c;
    });
    return newCommentsList;
  } else {
    const newCommentsList = commentsList.map((c) => {
      return c.replies?.some((r) => r.id === comment.id)
        ? { ...c, ["replies"]: [...c.replies, replyForm] }
        : c;
    });
    return newCommentsList;
  }
};
