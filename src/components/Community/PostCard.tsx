import { Button } from "@/components/ui/button";
import { ArrowUpCircle, MessageCircle, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface PostProps {
  post: {
    id: number;
    title: string;
    author: string;
    content: string;
    upvotes: number;
    comments: number;
    timePosted: string;
    type: string;
    image?: string; // Make image optional if not always present
  };
}

export default function PostCard({post}: PostProps){
  return (
    <Card key={post.id}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <Button variant="ghost" size="sm">
              <ArrowUpCircle className="h-6 w-6" />
            </Button>
            <span className="font-bold">{post.upvotes}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Posted by u/{post.author}</span>
              <span>•</span>
              <span>{post.timePosted}</span>
              <span>•</span>
              <span className="capitalize">{post.type}</span>
            </div>
            {post.image && (
            <div className="relative h-48 w-full mb-4">
              <Image
                src={post.image}
                layout="fill"
                objectFit="cover"
                alt={post.title}
                className="rounded-lg"
              />
            </div>
            )}
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                {post.comments} Comments
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
