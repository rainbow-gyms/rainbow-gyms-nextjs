import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: Number(session.user.id),
    },
    include: {
      user: true,
    },
  });

  if (!profile) {
    redirect("/profile/setup");
  }

  return <ProfileCard profile={profile} />;
}
