import { Comment, Comments } from "../../../types/data.ts";

export const addComment = (
  commentsList: Comments,
  newComment: Comment,
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>,
) => {
  setComments([...commentsList, newComment]);
};
