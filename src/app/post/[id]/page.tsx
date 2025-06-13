import { PostCard } from "@/components/post/PostCard";
import { CommentCard } from "@/components/comment/CommentCard";
import AddComment from "@/components/comment/AddComment"; // Import the new component
import { Post } from "@/interfaces/Post";
import Navbar from "@/components/partials/Navbar";
import api from "@/lib/api";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";

const getPost = async (id: number): Promise<Post> => {
  try {
    const response = await api.get(`/post/${id}`);
    return response.data;
  } catch (error: any) {
    redirect("/");
  }
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const postId = (await params).id;
  const session = await verifySession();
  const post = await getPost(postId);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <PostCard post={post} />

        {session.isAuth ? (
          <AddComment id={postId} />
        ) : (
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500">
              You need to log in to add a comment.
            </p>
          </div> // Message for unauthenticated users
        )}

        <div className="space-y-4">
          {post.comments && post.comments.length > 0 ? ( // Check if there are comments
            post.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                userId={session.userId ? Number(session.userId) : 0}
                              />
            ))
          ) : (
            <p>No comments</p> // Display message if no comments
          )}
        </div>
      </div>
    </div>
  );
}
