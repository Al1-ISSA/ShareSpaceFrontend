"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/post/PostCard";
import api from "@/lib/api";
import { Post } from "@/interfaces/Post";
import { useQuery } from "react-query"; // Import useQuery
import { Button } from "@/components/ui/button";
interface ListPostsProps {
  communityName: string;
  pageSize: number;
  totalPosts: number;
}

const ListPosts: React.FC<ListPostsProps> = ({
  communityName,
  pageSize,
  totalPosts,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalPosts / pageSize)
  );
  const [page, setPage] = useState(1);

  const fetchPosts = async (page: number = 1) => {
    try {
      const response = await api.get(`/post/community/${communityName}/pages`, {
        params: { page, pageSize },
      });
      console.log(response.data as Post[]);
      return response.data; // Return the response data
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["posts", page], () => fetchPosts(page), {
      keepPreviousData: true,
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
          {data && data.length > 0 ? (
            <>
              {data.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
              <div className="flex gap-3 mt-4 mb-4">
                <div className="inline-block px-2 border border-gray-200 rounded-lg bg-white text-center">
                  <span className="text-sm font-semibold">Current Page: {page}</span>
                </div>
                <Button
                  onClick={() => setPage((old) => Math.max(old - 1, 1))} // Decrement page
                  disabled={page === 1}
                  variant="outline" // Use an outline variant for styling
                  className="bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50" // Custom styles
                >
                  Previous Page
                </Button>
                <Button
                  onClick={() => {
                    if (totalPages > page) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={page === totalPages}
                  className="bg-black text-white disabled:opacity-50" // Custom styles
                >
                  Next Page
                </Button>
              </div>
            </>
          ) : (
            <div className="mt-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-white text-center">
              <span className="text-lg font-semibold">No Post</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListPosts;
