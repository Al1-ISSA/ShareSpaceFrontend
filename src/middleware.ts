import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/profile/edit"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  // Decrypt the session from the cookie
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  const requestHeaders = new Headers(req.headers);

  // Add the JWT token to the Authorization header if it exists
  const jwtToken = session?.jwtToken;
  if (jwtToken) {
    requestHeaders.set("Authorization", `Bearer ${jwtToken}`);

  }

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Forward the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
