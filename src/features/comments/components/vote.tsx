import { Comment, Comments } from "../../../types/data.ts";
import { vote } from "../utils/vote.ts";
export const Vote = ({
  score,
  comment,
  commentsList,
  setComments,
}: {
  score: number;
  comment: Comment;
  commentsList: Comments;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
}) => {
  return (
    <div className="voting">
      <button
        onClick={() => {
          const newCommentsList = vote(comment, commentsList, "up");
          setComments(newCommentsList);
        }}
      >
        <img className="scoreButtons" src="images/icon-plus.svg" />
      </button>
      <div className="score">{score}</div>
      <button
        onClick={() => {
          const newCommentsList = vote(comment, commentsList, "down");
          setComments(newCommentsList);
        }}
      >
        <img className="scoreButtons" src="images/icon-minus.svg" />
      </button>
    </div>
  );
};
