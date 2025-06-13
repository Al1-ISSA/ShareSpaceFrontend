import Navbar from "@/components/partials/Navbar";
import Sidebar from "@/components/partials/Sidebar";
import PostCard from "@/components/community/PostCard";
import PostScroller from "@/components/post/PostScroller";
const posts = [
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
];

const popularCommunities = [
  { name: "Technology", members: 1200000 },
  { name: "Gaming", members: 980000 },
  { name: "Movies", members: 750000 },
  { name: "Cooking", members: 500000 },
  { name: "Fitness", members: 620000 },
];

export default function ShareSpace() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar popularCommunities={popularCommunities} />
          <section className="flex-1 space-y-6">
            {/* {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))} */}
            <PostScroller />
          </section>
        </div>
      </main>
    </div>
  );
}
