import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCommunity from "../community/CreateCommunity";
import { verifySession } from "@/lib/dal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
interface Community {
  name: string;
  members: number;
}

interface SidebarProps {
  popularCommunities: Community[]; // Define the type for popularCommunities
}

export default async function Sidebar({ popularCommunities }: SidebarProps) {
  const session = await verifySession();

  return (
    <aside className="w-full md:w-64">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Popular Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {popularCommunities.map(
              (
                community: Community // Specify the type for community
              ) => (
                <li
                  key={community.name}
                  className="flex items-center justify-between">
                  <span>{community.name}</span>
                  <span className="text-sm text-gray-500">
                    {community.members.toLocaleString()} members
                  </span>
                </li>
              )
            )}
          </ul>
        </CardContent>
      </Card>

      {session.isAuth ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              Create Community
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogTitle>
              <VisuallyHidden>Create a new community</VisuallyHidden>
            </DialogTitle>
            <CreateCommunity />
          </DialogContent>
        </Dialog>
      ) : (
        <Button asChild className="w-full" variant="outline">
          <Link href="/auth/signin">Create Community</Link>
        </Button>
      )}
    </aside>
  );
}
