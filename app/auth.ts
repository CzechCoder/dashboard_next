import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectDb } from "./lib/utils";
import { User } from "./lib/models";
// import bcrypt from "bcrypt";

const login = async (credentials: Partial<Record<string, unknown>>) => {
  try {
    connectDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Invalid credentials");

    // const isPasswordCorrect = bcrypt.compare(
    //   credentials.password,
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

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
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
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.name = "admin";
        session.user.image = "";
      }
      return session;
    },
  },
});
