import { Author } from "./User";
import { Comment } from "./Comment";
import { Community } from "./Community";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  communityId: number;
  community: Community;
  authorId: number;
  author?: Author;
  isDeleted: boolean;
  likesCount: number;
  commentsCount: number;
  comments?: Comment[];
  mediaUrl: string;
}
