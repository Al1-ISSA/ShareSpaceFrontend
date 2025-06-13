import Header from "@/components/community/Header";
import Navbar from "@/components/partials/Navbar";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import PostCard from "@/components/post/PostCard";
import api from "@/lib/api";
import { Community } from "@/interfaces/Community";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { verifySession } from "@/lib/dal";
import ListPosts from "@/components/post/ListPosts";
import Link from "next/link";

//create a function to get the community
const getCommunity = async (
  name: string,
  userId?: number
): Promise<{ community: Community; isMember: boolean }> => {
  try {
    const resCommunity = await api.get(`/community/get/${name}`);
    let isMember = false; // Default value

    // Only call the second endpoint if userId is defined
    if (userId !== undefined) {
      const resMember = await api.get(`/community/isMember/${name}/${userId}`);
      isMember = resMember.data;
    }

    return {
      community: resCommunity.data,
      isMember,
    };
  } catch (error: any) {
    redirect("/");
  }
};

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const communityName = (await params).name;
  const session = await verifySession();
  const userId = session.userId as number | undefined; // Ensure userId is of the correct type
  const { community, isMember } = await getCommunity(communityName, userId);

  if (community.isDeleted) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
          <div className="text-center">
            {" "}
            {/* Center the content */}
            <p className="text-2xl font-bold text-red-600">
              This community has been deleted.
            </p>
            <Button asChild className="" variant="outline">
              <Link href="/">Go Back</Link>
            </Button>
            {/* Added button to go back to home */}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Header
        name={community.name}
        description={community.description}
        followersCount={community.followersCount}
        isMember={isMember}
        isOwner={community.creator.id === userId}
        id={community.id}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <section className="flex-1 space-y-6">
            <ListPosts
              communityName={community.name}
              pageSize={2}
              totalPosts={community.postCount}
            />
          </section>

          <CommunitySidebar
            description={community.description}
            creator={community.creator}
            isAuth={session.isAuth}
            communityId={community.id}
            communityName={community.name}
            isMember={isMember}
            followersCount={community.followersCount}
          />
        </div>
      </main>
    </div>
  );
}
