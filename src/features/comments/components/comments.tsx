import { useEffect, useState } from "react";
import { CommentsList } from "./comments-list.tsx";
import { CreateComment } from "./create-comment.tsx";
import { Comments, Data } from "../../../types/data.ts";
import { data } from "../api/index.ts";

function CommentsPage() {
  const [commentsList, setComments] = useState<Comments | null>(null);
  useEffect(() => {
    let active = true;
    data.then((response) => {
      if (active) {
        setComments(response.comments);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return (
    <section className="comments-feature">
      {commentsList !== null && <CommentsList commentsList={commentsList} />}
      <CreateComment />
    </section>
  );
}
export default CommentsPage;
