"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { likePost } from "@/actions/postlike";
import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const checkLike = async (postId: number) => {
  try {
    const response = await axios.post(`/api/like/checkpost`, {
      postId: postId,
    });

    const isLiked = response.data.isLiked;

    return isLiked;
  } catch (error) {
    return false;
  }
};

const LikePostForm = ({
  postId,
  likesCount,
}: {
  postId: number;
  likesCount: number;
}) => {
  const [state, likeAction] = useActionState(likePost, undefined);
  const [likeCount, setLikeCount] = useState<number>(likesCount);
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    checkLike(postId).then((data) => {
      setLike(data);
    });
  }, [postId]);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message);
      //set state.message to ""
      state.message = "";
    }
    if (state?.likes >= 0) {
      setLike(!like);
      setLikeCount(state?.likes);
    }
  }, [state]);

  return (
    <form action={likeAction}>
      <input type="hidden" name="postId" value={postId} />
      <SubmitButton isLiked={like} />
      <span>{likeCount}</span>
    </form>
  );
};

function SubmitButton({ isLiked }: { isLiked: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button variant="ghost" disabled={pending} type="submit">
      <Heart
        className={`mr-1 h-5 w-5 ${isLiked ? "fill-current text-red-500" : ""}`}
      />
    </Button>
  );
}

export default LikePostForm;
