// app/profile/check/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // adjust path to where your authOptions lives
import { prisma } from "@/lib/prisma";

export default async function ProfileCheckPage() {
  const session = await getServerSession(authOptions);

  // User is not logged in
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: Number(session.user.id),
    },
  });

  if (!profile) {
    redirect("/profile/setup");
  }

  redirect("/");
}
