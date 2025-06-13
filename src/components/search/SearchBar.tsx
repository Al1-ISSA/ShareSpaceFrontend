"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { searchPost } from "@/actions/search";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [state, searchAction] = useActionState(searchPost, undefined);
  const searchParams = useSearchParams();
  const params = searchParams.get("q");

  const [query, setQuery] = useState(params || "");

  return (
    <div className="relative">
      <form action={searchAction} className="flex p-2 ">
        <div className="flex flex-grow items-center border-2 rounded-lg ">
          <input
            id="query"
            name="query"
            type="text"
            className="flex-grow border-0 rounded-lg focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-sm p-2"
            placeholder={
              state?.errors?.query ? state.errors.query : "Search..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="ghost"
      disabled={pending}
      type="submit"
      className="hover:bg-transparent">
      <Search className="mr-1 h-5 w-5" />
    </Button>
  );
}
