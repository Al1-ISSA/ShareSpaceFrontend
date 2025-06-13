import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Lock } from "lucide-react";

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void; 
}

export default function SidebarOptions({
  activeTab,
  setActiveTab,
}: ProfileSidebarProps) {
  return (
    <aside className="w-full md:w-64">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Profile picture"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Picture</Button>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            orientation="vertical"
            className="w-full">
            <TabsList className="flex flex-col items-stretch h-auto">
              <TabsTrigger value="general" className="justify-start">
                <User className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
    </aside>
  );
}
