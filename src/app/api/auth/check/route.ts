import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import axios from "axios";
import { verifySession } from "@/lib/dal";

export async function GET(req: Request) {
  try {
    const session = await verifySession();
    //return session;
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
