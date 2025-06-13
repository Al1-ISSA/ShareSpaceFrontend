import "server-only";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { SessionPayload } from "@/lib/definitions";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is not set");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) {
      throw new Error("Session is undefined or empty");
    }
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {}
}

export async function createSession(
  jwtToken: string,
  username: string,
  userId: number
) {
  try {
    const decoded = jwtDecode<{ exp: number }>(jwtToken);

    const expires = new Date(decoded.exp * 1000);
    // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const session = await encrypt({ username, userId, jwtToken, expires });
    const cookieStore = await cookies();

    cookieStore.set({
      name: "session",
      value: session,
      httpOnly: true,
      expires: expires,
      path: "/",
    });
  } catch (error) {
    console.log("Failed to create session");
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
