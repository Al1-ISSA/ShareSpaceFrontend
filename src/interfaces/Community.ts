import { Creator } from "./User";

export interface Community {
  id: number;
  name: string;
  description: string;
  createdAt: Date; // Consider using Date type if you want to handle dates
  isPrivate: boolean;
  followersCount: number;
  creatorId: number;
  creator: Creator;
  postCount: number;
  isDeleted: boolean;
}
