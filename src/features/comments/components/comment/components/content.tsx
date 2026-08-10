import { useState } from "react";

function Content({
  replyingTo,
  content,
}: {
  replyingTo: string | undefined;
  content: string;
}) {
  return (
    <div className="content">
      <p className="content">
        {replyingTo !== undefined && (
          <span className="replyingTo">@{replyingTo} </span>
        )}
        {content}
      </p>
    </div>
  );
}
export default Content;
