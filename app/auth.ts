import "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "./lib/utils";
import { User } from "./lib/models";
// import bcrypt from "bcrypt";
import { UserType } from "./lib/types";
import NextAuth, { NextAuthConfig } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserType;
  }
}

declare module "@auth/core/types" {
  interface Session {
    user: UserType;
  }
}

declare module "next-auth" {
  interface User {
    username: string;
    img: string;
  }
}

const login = async (credentials: Partial<Record<string, unknown>>) => {
  try {
    connectDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Invalid credentials");

    // const isPasswordCorrect = await bcrypt.compare(
    //   credentials.password as string,
    //   user.password
    // );

    const isPasswordCorrect = true;

    if (!isPasswordCorrect) throw new Error("Invalid credentials");

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
};

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.username = user.username;
        session.user.img = user.img;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username || "someUsername";
        token.img = user.img || "";
      }
      return token;
    },
  },
};

export const { signIn, signOut, auth } = NextAuth(authConfig);
