import React from "react";
import { Button } from "@/components/ui/button";
import { ActionProps } from "@/types/type";

export default function Actions({
  isMultiplayer,
  setShowroom,
  leaveRoom,
  resetGame,
}: ActionProps) {
  return (
    <div className="flex">
      {!isMultiplayer ? (
        <Button onClick={() => setShowroom(true)} className="ml-2">
          Play With Friend
        </Button>
      ) : (
        <Button onClick={() => leaveRoom?.()} className="ml-2">
          Leave Room
        </Button>
      )}

      <Button
        variant="destructive"
        className="ml-2"
        onClick={() => resetGame()}
      >
        Reset Game
      </Button>
    </div>
  );
}
