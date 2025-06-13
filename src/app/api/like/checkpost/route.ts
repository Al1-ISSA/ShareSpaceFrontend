import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import axios from "axios";
import { verifySession } from "@/lib/dal";
import api from "@/lib/api";

export async function POST(req: Request) {
  try {
    //get post id from request body
    const { postId } = await req.json();
    //verify session
    const session = await verifySession();

    if (!session) {
      return NextResponse.json({ isLiked: false }, { status: 200 });
    }

    //get user id from session
    const userId = session.userId;
    //get like status
    const response = await api.get(`/like/checklike/${postId}/${userId}`);
    const isLiked = response.data;

    return NextResponse.json({ isLiked: isLiked }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
