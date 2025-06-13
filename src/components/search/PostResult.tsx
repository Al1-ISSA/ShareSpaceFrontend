"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/post/PostCard";
import api from "@/lib/api";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { Post } from "@/interfaces/Post";

import { useSearchParams } from "next/navigation";

const PostResult: React.FC = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]); // Add state to hold all posts
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [allFetched, setAllFetched] = useState(false);

  const fetchPosts = async (page: number = 1) => {
    try {
      const response = await api.get(`home/search/post`, {
        params: { page, searchTerm: query },
      });
      console.log(response.data as Post[]);
      return response.data; // Return the response data
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["posts", page], () => fetchPosts(page), {
      onSuccess: (newPosts) => {
        if (newPosts.length === 0) {
          setAllFetched(true);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      },
    });

  const SkeletonLoader = () => (
    <div className="flex flex-col gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-20 bg-gray-300 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
  return (
    <div>
      {isLoading ? (
        <SkeletonLoader />
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {/* Display posts or "No Post" message */}
          {posts && posts.length > 0 ? (
            <div>
              {posts.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
              {!allFetched && (
                <div className="flex gap-3 mt-4 mb-4">
                  <Button onClick={() => setPage(page + 1)}>View More</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-white text-center">
              <span className="text-lg font-semibold">No Posts</span>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostResult;
