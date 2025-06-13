"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditPassword from "@/components/profile/EditPassword";
import EditProfile from "@/components/profile/EditProfile";
import { useState } from "react";
import SidebarOptions from "@/components/profile/SidebarOptions";
import Navbar from "@/components/partials/Navbar";

export default function EditProfilePage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <SidebarOptions activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "general"
                    ? "General Settings"
                    : "Security Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === "general" ? <EditProfile /> : <EditPassword />}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
