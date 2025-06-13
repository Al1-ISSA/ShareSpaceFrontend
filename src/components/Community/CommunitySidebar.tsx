"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePost from "@/components/post/CreatePost"; // Import the CreatePost component
import { Community } from "@/interfaces/Community";
import Link from "next/link";
import { toast } from "sonner";

const CommunitySidebar = ({
  description,
  creator,
  isAuth,
  communityId,
  communityName,
  isMember,
  followersCount,
}: {
  description: string;
  creator: Community["creator"];
  isAuth: boolean;
  communityId: number;
  communityName: string;
  isMember: boolean;
  followersCount: number;
}) => {
  return (
    <aside className="w-full md:w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            <span className="text-sm text-black font-semibold mb-2">
              Members:
            </span>{" "}
            {followersCount}
          </p>

          <p className="text-sm text-gray-600 mb-4">
            <span className="text-sm text-black font-semibold mb-2">
              Description:
            </span>{" "}
            {description}
          </p>

          {isAuth ? (
            isMember ? ( // Check if the user is a member
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Create Post</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create a Post</DialogTitle>
                    <DialogDescription>
                      Share your thoughts, questions, or resources with the
                      community.
                    </DialogDescription>
                  </DialogHeader>
                  <CreatePost
                    communityId={communityId}
                    communityName={communityName}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              // Show toast if user is not a member
              <Button
                className="w-full"
                onClick={() =>
                  toast.error(
                    "You need to join the community to create a post."
                  )
                }>
                Create Post
              </Button>
            )
          ) : (
            <Button
              className="w-full"
              onClick={() =>
                toast.error("You need to sign in to create a post.")
              }>
              Create Post
            </Button>
          )}
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Community Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside text-sm space-y-2">
            <li>Be respectful and helpful</li>
            <li>No spam or self-promotion</li>
            <li>Use descriptive titles</li>
            <li>Tag your posts appropriately</li>
            <li>Search before asking</li>
          </ol>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Moderators</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-sm">{creator.username || "unknown"}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
};

export default CommunitySidebar;
