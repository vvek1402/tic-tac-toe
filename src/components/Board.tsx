"use client";
import React, { useEffect, useState } from "react";
import { MatchAlert } from "@/components/MatchAlert";
import MatchResult from "@/components/MatchResult";
import Tiles from "@/components/Tiles";
import { CreateRoom } from "./CreateRoom";
import { useToast } from "@/components/ui/use-toast";
import { useSocket } from "@/context/SocketContext";
import Actions from "./Actions";
import Fireworks from "./Fireworks";
import Indicator from "./Indicator";

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState("");
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [showRoom, setShowroom] = useState<boolean>(false);
  const [opponent, setOpponent] = useState<string>("");
  const [winningCount, setWinningCount] = useState<any>({ X: 0, O: 0, D: 0 });

  const { toast } = useToast();

  const {
    socket,
    leaveRoom,
    isMultiplayer,
    roomId,
    setIsMultiplayer,
    myTurn,
  }: any = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("userJoined", (opponentname: string) => {
        setShowroom(false);
        setOpponent(opponentname);
        setIsMultiplayer(true);
        toast({
          title: "New User Joined",
        });
      });

      socket.on("update-board", (data: any) => {
        setBoard(data.newBoard);
        setIsXNext(!data.isXNext);
        const { winner, line } = calculateWinner(data.newBoard);
        checkMatchEnded(winner, line);
      });

      socket.on("reset-board", () => {
        resetStates();
      });

      socket.on("update-score", (score: any) => {
        setWinningCount(score);
      });
    }
  }, [socket]);

  useEffect(() => {
    const isBoardFilled = board.every((value) => value !== null);
    if (!winner && isBoardFilled) {
      setDraw(true);
      setShowAlert(true);
      setType("draw");
      increaseCount("D");
    }
  }, [board]);

  const handleSquareClick = (index: number) => {
    let currentTurn = isXNext ? "X" : "O";
    if (
      !board[index] &&
      !winner &&
      !draw &&
      (!isMultiplayer || currentTurn === myTurn)
    ) {
      const newBoard = board.slice();
      newBoard[index] = currentTurn;
      setBoard(newBoard);
      setIsXNext(!isXNext);
      const { winner, line } = calculateWinner(newBoard);

      if (isMultiplayer) {
        socket.emit("new-move", { roomId, newBoard, isXNext });
      }

      checkMatchEnded(winner, line);
    }
  };

  const checkMatchEnded = (winner: any, line: any) => {
    if (winner) {
      setWinningLine(line);
      setWinner(winner);
      setShowAlert(true);
      setType("winner");
      increaseCount(winner);
    }
  };

  const calculateWinner = (squares: any) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i of lines) {
      const [a, b, c] = i;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: i };
      }
    }

    return { winner: null, line: [] };
  };

  const resetGame = () => {
    if (isMultiplayer) {
      socket.emit("reset-game");
    } else {
      resetStates();
    }
  };

  const resetStates = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
    setWinningLine([]);
    setDraw(false);
    setShowAlert(false);
  };

  const increaseCount = (player: string) => {
    setWinningCount((prevCount: any) => {
      const newCount = { ...prevCount, [player]: prevCount[player] + 1 };
      if (isMultiplayer) {
        socket.emit("match-ended", newCount);
      }
      return newCount;
    });
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col mt-16">
        <div className="m-5 flex items-center flex-col">
          {isMultiplayer && (
            <p className="text-[20px]">
              Playing Against <b>{opponent}</b>
            </p>
          )}
        </div>
        {winner || draw ? (
          <MatchResult
            type={winner ? "winner" : draw && "draw"}
            winner={winner}
          />
        ) : (
          <Indicator
            isXNext={isXNext}
            myTurn={myTurn}
            winningCount={winningCount}
            isMultiplayer={isMultiplayer}
          />
        )}
        <Tiles
          board={board}
          handleSquareClick={handleSquareClick}
          winningLine={winningLine}
        />
        <Actions
          isMultiplayer={isMultiplayer}
          setShowroom={setShowroom}
          leaveRoom={leaveRoom}
          resetGame={resetGame}
        />
        <MatchAlert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          type={type}
          winner={winner}
          resetGame={resetGame}
        />
        <CreateRoom showRoom={showRoom} setShowroom={setShowroom} />
        <Fireworks winner={winner} />
      </div>
    </>
  );
}

export default Board;
