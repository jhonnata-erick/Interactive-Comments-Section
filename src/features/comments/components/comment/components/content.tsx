import { useState } from "react";

function Content({
  replyingTo,
  content,
}: {
  replyingTo: string | undefined;
  content: string;
}) {
  const [editing, isEditing] = useState();
  return (
    <p className="content">
      {replyingTo !== undefined && (
        <span className="replyingTo">@{replyingTo} </span>
      )}
      {content}
    </p>
  );
}
export default Content;
