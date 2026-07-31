import { DefaultSession } from "next-auth";

export {};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      /*Below is for adding new session properties*/
      profilePic: string;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    /*Below is for adding new session properties*/
    profilePic: string;
    firstName: string;
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    /*Below is for adding new session properties*/
    profilePic: string;
    firstName: string;
    lastName: string;
  }
}
