import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const url = `${apiUrl}/user/auth/login`;

    const response = await axios.post(url, {
      email: email,
      password: password,
    });

    // Check if the response indicates a failure
    if (response.status !== 200) {
      throw new Error("Invalid username or password");
    }

    const { token, userId, username } = response.data;

    // Create a session
    await createSession(token, username, userId);

    // Return a 200 response with a success message
    return NextResponse.json({ message: "Signin successful" }, { status: 200 });
  } catch (error) {
    // Handle specific error responses
    if (axios.isAxiosError(error) && error.response) {
      // Return a 401 response for invalid credentials
      if (error.response.status === 400) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
    }
    // Return a 500 response in case of other errors
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
