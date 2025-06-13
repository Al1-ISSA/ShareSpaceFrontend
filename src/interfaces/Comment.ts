import { Author } from './User';
export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  authorId: number;
  author?: Author;
  isDeleted: boolean;
}
