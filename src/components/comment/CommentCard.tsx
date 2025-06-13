import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Comment } from "@/interfaces/Comment";
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
import DeleteComment from "@/components/comment/DeleteComment";

import { EllipsisVertical, Trash } from "lucide-react";

export const CommentCard = ({
  comment,
  userId,
}: {
  comment: Comment;
  userId?: number;
}) => (
  <Card className="mb-4">
    <CardContent className="pt-4">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex ">
            <div className="flex-1 flex flex-col  space-y-1">
              <div className="text-xs">
                <span className="text-xs ">posted by u/</span>
                {comment?.author?.username}
              </div>
              <div className="text-xs text-gray-500">
                • {new Date(comment?.createdAt).toLocaleDateString()}
              </div>
            </div>
            {userId == comment?.authorId && (
              <div>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Button variant="ghost">
                        <EllipsisVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <DialogTrigger >
                            <div className="flex text-sm justify-center space-x-2 align-center">
                              <Trash className="h-4 w-4" />
                              Delete Comment
                            </div>
                          </DialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DialogContent className="sm:max-w-[600px]">
                    <DialogTitle className="text-center">
                      <VisuallyHidden>Delete Comment</VisuallyHidden>
                    </DialogTitle>
                    <DeleteComment id={comment.id} postId={comment.postId} />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <p className="mt-1">{comment?.content}</p>
          
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CommentCard;
