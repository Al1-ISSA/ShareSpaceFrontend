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

const CommunityPanel = ({
  name,
  description,
  id,
}: {
  name: string;
  description: string;
  id: number;
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Edit</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Community</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <Settings />
              Edit Community
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash />
              Delete Community
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
          <EditCommunity name={name} description={description} id={id} />
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
          <DeleteCommunity name={name} id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommunityPanel;
