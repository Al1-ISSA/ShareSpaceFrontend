import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Community } from "@/interfaces/Community";
import JoinCommunityForm from "@/components/community/JoinCommunityForm";
import LeaveCommunityForm from "./LeaveCommunityForm";
import CommunityPanel from "@/components/community/CommunityPanel";

const Header = ({
  name,
  id,
  description,
  followersCount,
  isMember,
  isOwner,
}: {
  name: string;
  id: number;
  description: string;
  followersCount: number;
  isMember: boolean;
  isOwner: boolean;
}) => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>

            {/* <p className="mt-1 text-lg">
              A community for web developers to share and learn
            </p> */}
          </div>

          {isOwner ? (
            <CommunityPanel name={name} description={description} id={id} />
          ) : isMember ? (
            <LeaveCommunityForm name={name} />
          ) : (
            <JoinCommunityForm name={name} />
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;
