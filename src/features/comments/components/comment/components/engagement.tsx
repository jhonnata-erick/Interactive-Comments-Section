import { useEffect, useState } from "react";
import { Comment, Comments, User } from "../../../../../types/data.ts";
import { EditComment } from "../../edit-comment.tsx";
import { DeleteComment } from "../../delete-comment.tsx";
import { ReplyComment } from "../../reply-comment.tsx";
import { Vote } from "../../vote.tsx";

function Engagement({
  commentState,
  setCommentState,
  currentUser,
  comment,
  commentsList,
  setComments,
}: {
  commentState: string;
  setCommentState: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
  currentUser: User;
  comment: Comment;
  commentsList: Comments;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
}) {
  return (
    <>
      <Vote
        score={comment.score}
        comment={comment}
        commentsList={commentsList}
        setComments={setComments}
      />
      <UserActions
        user={comment.user}
        setCommentState={setCommentState}
        commentState={commentState}
        currentUser={currentUser}
      />
    </>
  );
}
function UserActions({
  user,
  setCommentState,
  commentState,
  currentUser,
}: {
  commentState: string;
  user: User;
  setCommentState: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing" | "deleting">
  >;
  currentUser: User;
}) {
  return (
    <div className="user-actions">
      {currentUser.username && user.username === currentUser.username && (
        <>
          <EditComment
            setEditing={setCommentState}
            commentState={commentState}
          />
          <DeleteComment setDeleting={setCommentState} />
        </>
      )}
      {user.username !== currentUser.username && (
        <>
          <ReplyComment setReplying={setCommentState} />
        </>
      )}
    </div>
  );
}

export default Engagement;
