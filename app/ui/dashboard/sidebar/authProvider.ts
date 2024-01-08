"use server";

import { auth } from "@/app/auth";

export async function authProvider() {
  const session = await auth();
  return session;
}
