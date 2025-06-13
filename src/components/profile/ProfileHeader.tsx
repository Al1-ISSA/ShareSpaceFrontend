import { Button } from "@/components/ui/button"
interface User {
    name: string;
    followers: number;
    following: number;
}
export default function ProfileHeader({name, followers, following}: User) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-xl font-semibold">
                {followers.toLocaleString()}
              </p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">
                {following.toLocaleString()}
              </p>
              <p className="text-gray-500">Following</p>
            </div>
            <Button
              variant="default">
              Follow
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
