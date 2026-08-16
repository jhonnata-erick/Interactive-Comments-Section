import React, { useState } from "react";
import { Comment, Comments, User } from "../../../../types/data.ts";
import Header from "./components/header.tsx";
import Content from "./components/content.tsx";
import Engagement from "./components/engagement.tsx";
import { ReplyingContainer } from "../reply-comment.tsx";
import { EditingContainer } from "../edit-comment.tsx";
import { DeleteModal } from "../delete-comment.tsx";

function CommentRender({
  commentsList,
  comment,
  setComments,
  currentUser,
}: {
  commentsList: Comments;
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  currentUser: User;
}) {
  const [commentState, setCommentState] = useState<
    "idle" | "replying" | "editing" | "deleting"
  >("idle");
  return (
    <>
      <div className="body">
        <div className="main">
          <div className="header">
            <Header
              user={comment.user}
              createdAt={comment.createdAt}
              currentUser={currentUser}
            />
          </div>
          {commentState === "editing" && (
            <EditingContainer
              comment={comment}
              setComments={setComments}
              commentsList={commentsList}
              setEditing={setCommentState}
            />
          )}
          {commentState !== "editing" && (
            <Content
              replyingTo={comment.replyingTo}
              content={comment.content}
            />
          )}
        </div>
        <div className="engagement">
          <Engagement
            commentState={commentState}
            setCommentState={setCommentState}
            currentUser={currentUser}
            comment={comment}
            commentsList={commentsList}
            setComments={setComments}
          />
        </div>
      </div>
      {commentState === "replying" && (
        <ReplyingContainer
          commentsList={commentsList}
          comment={comment}
          setReplying={setCommentState}
          setComments={setComments}
          currentUser={currentUser}
        />
      )}
      {comment.replies?.length! > 0 && (
        <RepliesRender
          commentsList={commentsList}
          replies={comment.replies}
          setComments={setComments}
          currentUser={currentUser}
        />
      )}
      {commentState === "deleting" && (
        <DeleteModal
          comment={comment}
          setComments={setComments}
          commentsList={commentsList}
          setDeleting={setCommentState}
        />
      )}
    </>
  );
}
function RepliesRender({
  commentsList,
  replies,
  setComments,
  currentUser,
}: {
  commentsList: Comments;
  replies: Comments | undefined;
  setComments: React.Dispatch<React.SetStateAction<Comments | null>>;
  currentUser: User;
}) {
  if (replies !== undefined) {
    const repliesLoad = replies.map((reply: Comment) => {
      return (
        <CommentRender
          commentsList={commentsList}
          comment={reply}
          setComments={setComments}
          currentUser={currentUser}
        />
      );
    });
    return <section className="repliesArea">{repliesLoad}</section>;
  }
}
export default CommentRender;
