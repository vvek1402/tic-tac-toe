import React from "react";
import { Button } from "./ui/button";

interface Props {
  board: string[];
  winningLine: number[];
  handleSquareClick: (index: number) => void;
}

const Tiles: React.FC<Props> = ({ board, winningLine, handleSquareClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {board.map((_, index) => (
        <Button
          key={index}
          variant="outline"
          className={`tiles perspective-[75em] rotate-x-18 shadow-xl border border-gray-300 rounded-lg square dark:hover:bg-gray-800 hover:bg-gray-300 text-[50px] w-[150px] h-[150px] ${
            winningLine.includes(index)
              ? "bg-emerald-400 dark:bg-emerald-800"
              : ""
          }`}
          onClick={() => handleSquareClick(index)}
        >
          {board[index]}
        </Button>
      ))}
    </div>
  );
};

export default Tiles;
