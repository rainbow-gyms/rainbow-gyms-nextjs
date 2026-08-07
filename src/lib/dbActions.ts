// src/lib/dbActions.ts
"use server";

import { hash } from "bcrypt";
import { prisma } from "./prisma";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import {
  WorkoutType,
  SchoolYear,
  ExperienceLevel,
  SessionStatus,
  GymLocation,
  Prisma,
} from "@prisma/client";

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

/**
 * Creates a user's profile after signup.
 */
export async function createProfile(data: {
  displayName: string;
  major: string;
  year: SchoolYear;
  experienceLevel: ExperienceLevel;
  bio: string;
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
      profilePicture: data.profilePicture,
    },
  });

  redirect("/");
}

export async function createSession(data: {
  name: string;
  workoutType: WorkoutType;
  location: GymLocation;
  description?: string;
  startTime: Date;
  maxPeople: number;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userId = Number(session.user.id);

  await prisma.session.create({
    data: {
      hostId: userId,
      name: data.name,
      workoutType: data.workoutType,
      location: data.location,
      description: data.description,
      startTime: data.startTime,
      maxPeople: data.maxPeople,
      status: SessionStatus.OPEN,

      participants: {
        create: {
          userId,
        },
      },
    },
  });

  redirect("/sessions");
}

export async function joinSession(sessionId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userId = Number(session.user.id);

  const sessionInfo = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      participants: true,
    },
  });

  if (!sessionInfo) {
    throw new Error("Session not found");
  }

  if (
    sessionInfo.status === SessionStatus.FULL ||
    sessionInfo.participants.length >= sessionInfo.maxPeople
  ) {
    throw new Error("Session is full");
  }

  const existingParticipant = await prisma.sessionParticipant.findUnique({
    where: {
      sessionId_userId: {
        sessionId,
        userId,
      },
    },
  });

  if (existingParticipant) {
    throw new Error("Already joined this session");
  }

  await prisma.sessionParticipant.create({
    data: {
      sessionId,
      userId,
    },
  });

  const participantCount = sessionInfo.participants.length + 1;

  if (participantCount >= sessionInfo.maxPeople) {
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        status: SessionStatus.FULL,
      },
    });
  }
}

export type AvailableSession = Prisma.SessionGetPayload<{
  include: {
    host: {
      include: {
        profile: true;
      };
    };
    participants: true;
  };
}>;
export async function getAvailableSessions() {
  const sessions = await prisma.session.findMany({
    where: {
      status: SessionStatus.OPEN,
    },

    include: {
      host: {
        include: {
          profile: true,
        },
      },
      participants: true,
    },

    orderBy: {
      startTime: "asc",
    },
  });

  return sessions.filter(
    (session) => session.participants.length < session.maxPeople,
  );
}
