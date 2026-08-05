import { Comments, Comment, User } from "../../../types/data.ts";
import CommentRender from "./comment/comment.tsx";

export function CommentsList({
  commentsList,
  setComments,
  currentUser,
}: {
  commentsList: Comments;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  currentUser: User;
}) {
  return (
    <section className="comments-list">
      <CommentsLoad
        commentsList={commentsList}
        setComments={setComments}
        currentUser={currentUser}
      />
    </section>
  );
}

function CommentsLoad({
  commentsList,
  setComments,
  currentUser,
}: {
  commentsList: Comments;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  currentUser: User;
}) {
  const commentsLoad = commentsList.map((comment: Comment) => {
    return (
      <CommentRender
        commentsList={commentsList}
        comment={comment}
        setComments={setComments}
        currentUser={currentUser}
      />
    );
  });
  return commentsLoad;
}
