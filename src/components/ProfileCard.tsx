"use client";

import { Card, Image, Badge } from "react-bootstrap";

type ProfileCardProps = {
  profile: {
    displayName: string;
    profilePicture: string | null;
    major: string;
    bio: string;
    experienceLevel: string;
    year: string;
    user: {
      email: string;
      role: string;
    };
  };
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card
      className="shadow-sm border-0 text-center p-4"
      style={{
        maxWidth: "400px",
        margin: "auto",
        borderRadius: "20px",
      }}
    >
      <div className="d-flex justify-content-center mb-3">
        <Image
          src="/pfp-default.png"
          width={120}
          height={120}
          roundedCircle
          alt="profile picture"
          className="border border-3 border-primary"
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <Card.Title className="mb-1">{profile.displayName}</Card.Title>

      <Card.Subtitle className="text-muted mb-3">
        {profile.user.email}
      </Card.Subtitle>

      {profile.user.role === "ADMIN" && (
        <Badge bg="danger" className="mb-3">
          Admin Account
        </Badge>
      )}

      <Card.Text className="mb-2">
        <strong>Major:</strong> {profile.major}
      </Card.Text>

      <Card.Text className="text-muted">{profile.bio}</Card.Text>

      <div className="mt-2">
        <Badge bg="primary" className="me-2">
          {profile.experienceLevel}
        </Badge>

        <Badge bg="secondary">{profile.year}</Badge>
      </div>
    </Card>
  );
}
