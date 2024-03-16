import React from "react";

export default function MatchResult(props: any) {
  return (
    <div className="m-5 flex items-center flex-col">
      {props.type && props.type == "winner" && (
        <>
          <img
            className="w-11"
            src="https://static-00.iconduck.com/assets.00/medal-gold-winner-2-icon-492x512-hicgyfg1.png"
          />

          <p className="text-[30px] mt-4">{props.winner} is the Winner</p>
        </>
      )}
      {props.type && props.type == "draw" && (
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
