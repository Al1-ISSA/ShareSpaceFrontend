import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export const verifySession = async () => {
  try {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
      return { isAuth: false };
    }
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return { isAuth: false };
    }

    return {
      isAuth: true,
      userId: session.userId,
      username: session.username,
      jwtToken: session.jwtToken,
    };
  } catch (error) {
    console.log("Failed to verify session");
    console.log(error);
    return { isAuth: false };
  }
};
