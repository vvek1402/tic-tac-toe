import React from "react";

export default function Fireworks({ winner }: { winner: string }) {
  return (
    <div>
      {winner && (
        <>
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </>
      )}
    </div>
  );
}
