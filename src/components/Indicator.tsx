import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Indicator({ isXNext, winningCount } : any) {
  return (
    <div className="bg-white p-4 rounded-lg text-center mb-5 dark:bg-black">
      <div className="space-y-1">
        <h4 className="font-medium leading-none text-[20px]">
          Current Turn: {isXNext ? "X" : "O"}
        </h4>
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
