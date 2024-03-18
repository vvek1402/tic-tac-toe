import React from "react";

export default function MatchResult({
  type,
  winner,
}: {
  type: string;
  winner: string;
}) {
  return (
    <div className="m-5 flex items-center flex-col">
      {type && type == "winner" && (
        <>
          <img
            className="w-11"
            src="medal-gold.png"
          />

          <p className="text-[30px] mt-4">{winner} is the Winner</p>
        </>
      )}
      {type && type == "draw" && (
        <>
          <img
            className="w-11"
            src="draw.png"
          />
          <p className="text-[30px] mt-4">Match is Draw </p>
        </>
      )}
    </div>
  );
}
