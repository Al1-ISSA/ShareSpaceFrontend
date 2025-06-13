import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchBar from "../search/SearchBar";
import { verifySession } from "@/lib/dal";
import Link from "next/link";
import { LogoutForm } from "@/components/auth/LogoutForm";

// interface NavbarProps {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void; // Define the type for setSearchQuery
// }

export default async function Navbar() {
  const session = await verifySession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">ShareSpace</h1>
          </Link>
          <SearchBar />
        </div>
        {session?.isAuth ? (
          <div className="flex items-center space-x-4">
            <Link href="/profile">Profile</Link>
            <LogoutForm />
          </div>
        ) : (
          <Link href="/auth/signin">Login</Link>
        )}
      </div>
    </header>
  );
}
