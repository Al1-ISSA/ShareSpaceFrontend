import Navbar from "@/components/partials/Navbar";
import ResultCard from "@/components/community/CommunityCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Community } from "@/interfaces/Community";
import CommunityResult from "@/components/search/CommunityResult";
import PostResult from "@/components/search/PostResult";

export default async function ShareSpace() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <section className="max-w-[600px] flex-1 space-y-2">
            <Tabs defaultValue="community">
              <TabsList>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="post">Posts</TabsTrigger>
              </TabsList>
              <TabsContent value="community">
                <CommunityResult />
              </TabsContent>
              <TabsContent value="post">
                <PostResult />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
}
