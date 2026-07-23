import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthUser = {
  id: string;
  randomKey: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
        // Example:
        // const user = await validateUser(credentials);

        // Return null if authentication fails
        return null;

        // Or return:
        // return {
        //   id: user.id,
        //   randomKey: user.randomKey,
        //   email: user.email,
        // };
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
        token.randomKey = u.randomKey;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.randomKey = token.randomKey!;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
