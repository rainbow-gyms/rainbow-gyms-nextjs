"use client"

import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { deleteSession } from "@/lib/dbActions";

type DeleteButtonProps = {
  sessionId: number;
  sessionName: string;
};

export default function DeleteButton({ sessionId, sessionName }: DeleteButtonProps ) {
    const handleClick = () => {
      const userConfirmed = window.confirm(`Press OK to delete: ${sessionName}`)

      if (userConfirmed) {
        deleteSession(sessionId);
      }
    }
    
    return(
      <Button 
        variant="danger" 
        onClick={ handleClick }
      >
        <Trash />
      </Button>
    );
};

