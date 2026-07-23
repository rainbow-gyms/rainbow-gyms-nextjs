import { DefaultSession } from "next-auth";

export {};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      randomKey: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    randomKey: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    randomKey?: string;
    role?: string;
  }
}
