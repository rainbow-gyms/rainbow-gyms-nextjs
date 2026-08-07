"use client";

import { Alert } from "react-bootstrap";

type SuccessToastProps = {
  show: boolean;
  message: string;
};

export default function SuccessToast({ show, message }: SuccessToastProps) {
  if (!show) return null;

  return (
    <Alert
      variant="warning"
      className="position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow"
      style={{
        zIndex: 1050,
        borderRadius: "12px",
        minWidth: "300px",
        textAlign: "center",
      }}
    >
      {message}
    </Alert>
  );
}
