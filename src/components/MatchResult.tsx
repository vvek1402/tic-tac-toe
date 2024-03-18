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
            src="https://static-00.iconduck.com/assets.00/medal-gold-winner-2-icon-492x512-hicgyfg1.png"
          />

          <p className="text-[30px] mt-4">{winner} is the Winner</p>
        </>
      )}
      {type && type == "draw" && (
        <>
          <img
            className="w-11"
            src="https://cdn1.iconfinder.com/data/icons/chess-bzzricon-color-omission/512/20_Draw-512.png"
          />
          <p className="text-[30px] mt-4">Match is Draw </p>
        </>
      )}
    </div>
  );
}
