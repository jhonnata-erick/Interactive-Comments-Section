import { useEffect, useState } from "react";
import { Comments, User } from "../../../../../types/data.ts";
import { data } from "../../../api/index.ts";
import { EditComment } from "../../edit-comment.tsx";
import { DeleteComment } from "../../delete-comment.tsx";
import { ReplyComment } from "../../reply-comment.tsx";

function Engagement({
  score,
  user,
  setCommentState,
}: {
  score: number;
  user: User;
  setCommentState: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing">
  >;
}) {
  return (
    <>
      <div className="voting">
        <button>
          <img className="scoreButtons" src="images/icon-plus.svg" />
        </button>
        <div className="score">{score}</div>
        <button>
          <img className="scoreButtons" src="images/icon-minus.svg" />
        </button>
      </div>
      <UserActions user={user} setReplying={setCommentState} />
    </>
  );
}
function UserActions({
  user,
  setReplying,
}: {
  user: User;
  setReplying: React.Dispatch<
    React.SetStateAction<"idle" | "replying" | "editing">
  >;
}) {
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    data.then((response) => {
      if (active) {
        setCurrentUsername(response.currentUser.username);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="user-actions">
      {currentUsername && user.username === currentUsername && (
        <>
          <EditComment />
          <DeleteComment />
        </>
      )}
      {user.username !== currentUsername && (
        <>
          <ReplyComment setReplying={setReplying} />
        </>
      )}
    </div>
  );
}

export default Engagement;
