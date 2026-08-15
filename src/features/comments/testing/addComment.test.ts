import { addComment } from "../utils/addComment.ts";
import { describe, expect, it, vi } from "vitest";

describe("addComment", () => {
  it("should add a new comment to the comments list", () => {
    const commentsList = [
      {
        id: 35,
        content:
          "Are you planning on supporting markdown parsing inside the comment input boxes eventually?",
        createdAt: "20 mins ago",
        score: 1,
        user: {
          image: {
            png: "./images/avatars/image-markdownfan.png",
            webp: "./images/avatars/image-markdownfan.webp",
          },
          username: "markdownfan",
        },
        replies: [],
      },
    ];
    const newComment = {
      id: 36,
      content:
        "Just found this repository today. Really outstanding work! The transitions are buttery smooth on Safari desktop too.",
      createdAt: "5 mins ago",
      score: 2,
      user: {
        image: {
          png: "./images/avatars/image-appleuser.png",
          webp: "./images/avatars/image-appleuser.webp",
        },
        username: "appleuser",
      },
      replies: [],
    };
    const setComments = vi.fn();
    addComment(commentsList, newComment, setComments);
    expect(setComments).toHaveBeenCalledWith([...commentsList, newComment]);
  });
});
