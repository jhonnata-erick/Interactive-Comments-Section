import { Comments, Comment } from "../../../types/data.ts";
import CommentRender from "./comment/comment.tsx";

export function CommentsList({ commentsList }: { commentsList: Comments }) {
  return (
    <section className="comments-list">
      <CommentsLoad commentsList={commentsList} />
    </section>
  );
}

function CommentsLoad({ commentsList }: { commentsList: Comments }) {
  const commentsLoad = commentsList.map((comment: Comment) => {
    return <CommentRender comment={comment} />;
  });
  console.log(commentsList);
  return commentsLoad;
}
