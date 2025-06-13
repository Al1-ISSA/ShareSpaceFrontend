"use client";
import { Settings, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import EditCommunity from "@/components/community/EditCommunity";
import DeleteCommunity from "@/components/community/DeleteCommunity";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Post } from "@/interfaces/Post";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

const PostPanel = ({ post }: { post: Post }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Post</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Settings />
              Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash />
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={isEditDialogOpen}
        onOpenChange={() => setIsEditDialogOpen(!isEditDialogOpen)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>
            <VisuallyHidden>Edit community</VisuallyHidden>
          </DialogTitle>
          <EditPost post={post} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="text-center">
            <VisuallyHidden>Delete community</VisuallyHidden>
          </DialogTitle>
          <DeletePost id={post.id} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostPanel;
