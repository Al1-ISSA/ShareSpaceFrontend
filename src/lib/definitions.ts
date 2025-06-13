import { z } from 'zod'

export interface SessionPayload {
  username: string;
  userId: number;
  jwtToken: string;
  expires: Date;
  [key: string]: any; // Added index signature
}

