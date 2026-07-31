"use client";

import { createProfile } from "@/lib/dbActions";
import { useState } from "react";

type ProfileForm = {
  displayName: string;
  major: string;
  year: "FRESHMAN" | "SOPHOMORE" | "JUNIOR" | "SENIOR" | "GRADUATE";
  experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  bio: string;
  profilePicture?: string;
};

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState<ProfileForm>({
    displayName: "",
    major: "",
    year: "FRESHMAN",
    experienceLevel: "BEGINNER",
    bio: "",
    profilePicture: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createProfile(formData);
  };

  return (
    <main>
      <h1>Setup Profile</h1>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Display Name"
          value={formData.displayName}
          onChange={(e) =>
            setFormData({
              ...formData,
              displayName: e.target.value,
            })
          }
        />

        <input
          placeholder="Major"
          value={formData.major}
          onChange={(e) =>
            setFormData({
              ...formData,
              major: e.target.value,
            })
          }
        />

        <select
          value={formData.year}
          onChange={(e) =>
            setFormData({
              ...formData,
              year: e.target.value as ProfileForm["year"],
            })
          }
        >
          <option value="FRESHMAN">Freshman</option>
          <option value="SOPHOMORE">Sophomore</option>
          <option value="JUNIOR">Junior</option>
          <option value="SENIOR">Senior</option>
          <option value="GRADUATE">Graduate</option>
        </select>

        <select
          value={formData.experienceLevel}
          onChange={(e) =>
            setFormData({
              ...formData,
              experienceLevel: e.target.value as
                | "BEGINNER"
                | "INTERMEDIATE"
                | "ADVANCED",
            })
          }
        >
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>

        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) =>
            setFormData({
              ...formData,
              bio: e.target.value,
            })
          }
        />

        <input
          placeholder="Profile Picture URL"
          value={formData.profilePicture}
          onChange={(e) =>
            setFormData({
              ...formData,
              profilePicture: e.target.value,
            })
          }
        />

        <button type="submit">Create Profile</button>
      </form>
    </main>
  );
}
