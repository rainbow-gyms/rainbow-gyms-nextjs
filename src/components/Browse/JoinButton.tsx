// src/components/JoinButton.tsx
"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { joinSession } from "@/lib/dbActions";
import { useRouter } from "next/navigation";

export default function JoinButton({ sessionId }: { sessionId: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleJoin() {
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      await joinSession(sessionId);
      setMessage("Joined session!");
      router.refresh();
    } catch (error) {
      setError(true);
      setMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleJoin} disabled={loading}>
        {loading ? "Joining..." : "Join Session"}
      </Button>

      {message && (
        <p className={error ? "text-danger" : "text-success"}>{message}</p>
      )}
    </div>
  );
}
