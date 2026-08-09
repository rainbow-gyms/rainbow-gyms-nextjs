// src/app/sessions/page.tsx

import { Row, Col } from "react-bootstrap";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MySessionCard from "@/components/MySessions/MySessionCard";

export default async function mySessions() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }
  
  const userId = Number(session.user.id);

  const myprofile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  if (!myprofile) {
    redirect("/profile/setup");
  }

  const mysessions = await prisma.session.findMany({
    where: {
      OR: [
        {
          hostId: userId,
        },
        {
          participants: {
            some: {
              userId: userId,
            },
          },
        },
      ],
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
  return (
    <div className="container my-4">
      <h1 className="mb-4 border-bottom border-5 display-4 fw-bold">My Sessions</h1>
      {mysessions.length === 0 ? (
          <p>You haven&apos;t joined or created any sessions yet...</p>
        ) : (
          <Row>
            {mysessions.map((workout) => (
              <Col key={workout.id} xs={12} md={4}>
                <MySessionCard mysession = {workout} userid = {userId} />
              </Col>
            ))}
          </Row>
      )}
    </div>
  )
}
