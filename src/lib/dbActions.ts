// src/lib/dbActions.ts
"use server";

import { hash } from "bcrypt";
import { prisma } from "./prisma";
import { auth } from "./auth";
import { redirect } from "next/navigation";

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: {
  email: string;
  password: string;
}) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const existingUser = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      role: "USER",
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: {
  email: string;
  password: string;
}) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function createProfile(data: {
  displayName: string;
  major: string;
  year: string;
  experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  bio: string;
  preferredGym: string;
  profilePicture?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const existingProfile = await prisma.profile.findUnique({
    where: {
      userId: Number(session.user.id),
    },
  });

  if (existingProfile) {
    throw new Error("Profile already exists");
  }

  await prisma.profile.create({
    data: {
      userId: Number(session.user.id),
      displayName: data.displayName,
      major: data.major,
      year: data.year,
      experienceLevel: data.experienceLevel,
      bio: data.bio,
      preferredGym: data.preferredGym,
      profilePicture: data.profilePicture,
    },
  });

  redirect("/calendar");
}
