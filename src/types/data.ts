export type Comments = Comment[];
export type User = {
  image: Img;
  username: string;
};
export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: Comments;
  replyingTo?: string;
};
export type Data = {
  currentUser: User;
  comments: Comments;
};
export type Img = {
  png: string;
  webp: string;
};
