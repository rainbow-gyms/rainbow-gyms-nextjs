import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CreateForm from "@/components/CreateForm";

export default async function Create() {
  const session = await auth();

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

  return <CreateForm />;
}
