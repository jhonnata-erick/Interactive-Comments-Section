import { useEffect, useState } from "react";
import { CommentsList } from "./comments-list.tsx";
import { CreateComment } from "./create-comment.tsx";
import { Comments, Data, User } from "../../../types/data.ts";
import { data } from "../api/index.ts";

function CommentsPage() {
  const [commentsList, setComments] = useState<Comments | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    let active = true;
    data.then((response) => {
      if (active) {
        setComments(response.comments);
        setCurrentUser(response.currentUser);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    const dados = { ["currentUser"]: currentUser, ["comments"]: commentsList };
    localStorage.setItem("dados", JSON.stringify(dados));
  }, [commentsList]);
  return (
    <section className="comments-feature">
      {commentsList && currentUser && (
        <>
          <CommentsList
            commentsList={commentsList}
            setComments={setComments}
            currentUser={currentUser}
          />
          <CreateComment
            commentsList={commentsList}
            setComments={setComments}
            currentUser={currentUser}
          />
        </>
      )}
    </section>
  );
}
export default CommentsPage;
