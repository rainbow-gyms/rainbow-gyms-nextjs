// src/components/JoinButton.tsx
"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { joinSession } from "@/lib/dbActions";
import { useRouter } from "next/navigation";

export default function JoinButton({ sessionId }: { sessionId: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleJoin() {
    setLoading(true);

    try {
      await joinSession(sessionId);
      router.refresh();
      alert("Joined session!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleJoin} disabled={loading}>
      {loading ? "Joining..." : "Join Session"}
    </Button>
  );
}
