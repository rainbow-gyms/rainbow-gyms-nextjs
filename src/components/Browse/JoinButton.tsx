"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { joinSession } from "@/lib/dbActions";

export default function JoinButton({ sessionId }: { sessionId: number }) {
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    setLoading(true);

    try {
      await joinSession(sessionId);
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
