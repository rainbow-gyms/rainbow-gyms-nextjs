import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileCard from "@/components/ProfileCard";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = Number(id);

  if (Number.isNaN(userId)) {
    return notFound();
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
    },
  });

  if (!profile) {
    return notFound();
  }

  return (
    <main>
      <ProfileCard profile={profile} />
    </main>
  );
}
