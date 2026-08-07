import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type AuthUser = {
  id: string;
  email: string;
  role: string;
  /*Below is for adding new session properties*/
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour (in seconds)
  },

  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@foo.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          /*Below is for adding new session properties*/
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser;

        token.id = u.id;
        token.role = u.role;
        /*test again*/
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        /*Below is for adding new session properties*/
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
