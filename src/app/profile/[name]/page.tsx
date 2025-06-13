import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PostCard from "@/components/community/PostCard";
const data = {
  id: 1,
  name: "Jane Doe",
  bio: "Tech enthusiast | Coffee lover | Always learning",
  followers: 1520,
  following: 364,
  posts: [
    {
      id: 1,
      title: "Just launched my first app!",
      author: "techEnthusiast",
      content:
        "After months of hard work, I've finally launched my first app. It's a productivity tool that...",
      upvotes: 1024,
      comments: 89,
      timePosted: "2 hours ago",
      type: "discussion",
      image: "https://picsum.photos/500/300?random=1",
    },
    {
      id: 2,
      title: "What's your favorite programming language and why?",
      author: "codeNinja",
      content:
        "I'm curious to hear what programming languages everyone prefers and the reasons behind their choices...",
      upvotes: 728,
      comments: 132,
      timePosted: "5 hours ago",
      type: "question",
    },
    {
      id: 3,
      title: "10 VS Code extensions every developer should know",
      author: "devToolsGuru",
      content:
        "Here's a list of VS Code extensions that have significantly improved my productivity:...",
      upvotes: 512,
      comments: 75,
      timePosted: "1 day ago",
      type: "resource",
    },
  ],
};

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileHeader
        name={data.name}
        followers={data.followers}
        following={data.following}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <section className="md:w-2/3 space-y-4">
            {data.posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </section>

          <aside className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>About {data.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{data.bio}</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
