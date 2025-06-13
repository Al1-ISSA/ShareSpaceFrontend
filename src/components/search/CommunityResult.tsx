"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/post/PostCard";
import api from "@/lib/api";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { Community } from "@/interfaces/Community";
import CommunityCard from "../community/CommunityCard";
import { useSearchParams } from "next/navigation";

const CommunityResult: React.FC = () => {
  const [page, setPage] = useState(1);
  const [communities, setCommunities] = useState<Community[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [allFetched, setAllFetched] = useState(false);

  const fetchPosts = async (page: number = 1) => {
    try {
      const response = await api.get(`/home/search/community`, {
        params: { page, searchTerm: query },
      });
      console.log(response.data as Community[]);
      return response.data; // Return the response data
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["communities", page], () => fetchPosts(page), {
      onSuccess: (newCommunities) => {
        if (newCommunities.length === 0) {
          setAllFetched(true);
        } else {
          setCommunities((prevCommunities) => [
            ...prevCommunities,
            ...newCommunities,
          ]); // Concatenate new posts
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
          {communities && communities.length > 0 ? (
            <div>
              {communities.map((community, index) => (
                <CommunityCard key={index} {...community} />
              ))}
              {!allFetched && (
                <div className="flex gap-3 mt-4 mb-4">
                  <Button onClick={() => setPage(page + 1)}>View More</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-white text-center">
              <span className="text-lg font-semibold">No Communities</span>{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityResult;
