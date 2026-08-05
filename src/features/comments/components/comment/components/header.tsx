import { useState, useEffect } from "react";
import { User } from "../../../../../types/data.ts";
import { data } from "../../../api/index.ts";

function Header({ user, createdAt }: { user: User; createdAt: string }) {
  const [currentUser, setIsCurrentUser] = useState(false);
  useEffect(() => {
    let active = true;

    data.then((response) => {
      if (active && response.currentUser.username === user.username) {
        setIsCurrentUser(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);
  return (
    <div className="comment-author">
      <div className="author-photo">
        <img src={user.image.webp} />
      </div>
      <div className="author-username">{user.username}</div>
      {currentUser && <div className="isCurrentUser">you</div>}
      <div className="createdAt">
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
export default Header;
