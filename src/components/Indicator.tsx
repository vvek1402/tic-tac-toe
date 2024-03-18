import { Separator } from "@/components/ui/separator";
import { IndicatorProps } from "@/types/type";
import React from "react";

export default function Indicator({
  isXNext,
  myTurn,
  winningCount,
  isMultiplayer,
}: IndicatorProps) {
  let symbol = isXNext ? "X" : "O";
  return (
    <div className="bg-white p-4 rounded-lg text-center mb-5 dark:bg-black">
      <div className="space-y-1">
        {isMultiplayer ? (
          <h4 className="font-medium leading-none text-[20px]">
            {symbol == myTurn
              ? `Your Turn : ${symbol}`
              : `Opponent Turn : ${symbol}`}
          </h4>
        ) : <h4 className="font-medium leading-none text-[20px]">Current Turn : {symbol}</h4>}
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center justify-center space-x-4 text-[15px]">
        <div>X : {winningCount.X}</div>
        <Separator orientation="vertical" />
        <div>O : {winningCount.O}</div>
        <Separator orientation="vertical" />
        <div>D : {winningCount.D}</div>
      </div>
    </div>
  );
}
