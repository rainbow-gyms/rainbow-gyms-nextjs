"use client";

import { Image } from "react-bootstrap";

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
    <>
      <Image
        src={profile.profilePicture ?? "/default-profile.png"}
        width={100}
        height={100}
        roundedCircle
        alt="profile picture"
      />

      <h3>{profile.displayName}</h3>

      <h6>{profile.user.email}</h6>

      {profile.user.role === "ADMIN" && (
        <h6 style={{ color: "red" }}>Admin Account</h6>
      )}

      <h6>{profile.major} Major</h6>

      <p>{profile.bio}</p>

      <p>Experience: {profile.experienceLevel}</p>
    </>
  );
}
