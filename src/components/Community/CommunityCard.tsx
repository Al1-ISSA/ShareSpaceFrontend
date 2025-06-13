import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Community } from "@/interfaces/Community";

export default function CommunityCard(community: Community) {
  return (
    <Card className="mb-2">
      <CardContent className="flex items-center space-x-2 p-2">
        <div className="flex-grow">
          <h3 className="text-sm font-semibold">
            <Link
              href={`/community/${community.name}`}
              className="hover:underline">
              {community.name}
            </Link>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {community.followersCount} members
          </p>
        </div>
        {/* <Button variant="outline" className="text-xs py-1 px-2">
          Join
        </Button> */}
      </CardContent>
    </Card>
  );
}
