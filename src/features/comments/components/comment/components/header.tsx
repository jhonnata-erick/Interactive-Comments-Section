import { useState, useEffect } from "react";
import { User } from "../../../../../types/data.ts";

function Header({
  user,
  createdAt,
  currentUser,
}: {
  user: User;
  createdAt: string;
  currentUser: User;
}) {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  if (currentUser.username === user.username) {
    setIsCurrentUser(true);
  }
  return (
    <div className="comment-author">
      <div className="author-photo">
        <img src={user.image.webp} />
      </div>
      <div className="author-username">{user.username}</div>
      {isCurrentUser && <div className="isCurrentUser">you</div>}
      <div className="createdAt">
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
export default Header;
