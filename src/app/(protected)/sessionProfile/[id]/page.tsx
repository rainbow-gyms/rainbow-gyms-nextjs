import { notFound } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import SessionProfileDetails from '@/components/SessionProfilePage';

export default async function SessionProfilePage({ params }: { params: { id: string | string[] } }) {
  const { id } = await params;
  const realId = Number(id);

  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const gymSession = await prisma.session.findUnique({
    where: { id: realId },
    include: {
      host: {
        include: {
          profile: true,
        },
      },
      participants: true,
    },
  });

  if (!gymSession) {
    return notFound();
  }

  return (
    <main>
      <SessionProfileDetails session={gymSession} />
    </main>
  );
}