"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react";
import { Post } from "@/interfaces/Post";
import Image from "next/image";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import PostPanel from "./PostPanel";
import LikePostForm from "./LikePostForm";
import axios from "axios";
import { useEffect, useState } from "react";

const checkAuth = async () => {
  try {
    const response = await axios.get("/api/auth/check");
    return response.data;
  } catch (error) {
    return { isAuth: false };
  }
};

export const PostCard = ({ post }: { post: Post }) => {
  const [session, setSession] = useState({ isAuth: false });

  useEffect(() => {
    checkAuth().then((data) => {
      setSession(data);
    });
  }, []);

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex">
          <div className="flex-1">
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>
                Posted on{" "}
                <Link href={`/community/${post.community.name}`}>
                  {post.community ? post.community.name : "deleted"}
                </Link>{" "}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>
                Posted by{" "}
                <Link href={`/`}>
                  u/{post.author ? post.author.username : "deleted"}
                </Link>{" "}
              </span>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div>
            {session.isAuth && session.userId === post.authorId && (
              <PostPanel post={post} />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {post?.mediaUrl && (
          <div className="relative h-48 w-full mb-4">
            <Image
              src={post.mediaUrl}
              layout="fill"
              objectFit="cover"
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-4">
          {session.isAuth && session.userId === post.authorId ? (
            <Button variant="ghost">
              <Heart className="mr-1 h-5 w-5" />
              {post.likesCount}
            </Button>
          ) : (
            <LikePostForm postId={post.id} likesCount={post.likesCount} />
          )}
          <Link href={`/post/${post.id}`} passHref>
            <Button variant="ghost">
              <MessageCircle className="mr-1 h-5 w-5" />
              {post.commentsCount} Comments
            </Button>
          </Link>
          <Button variant="ghost">
            <Share2 className="mr-1 h-5 w-5" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
