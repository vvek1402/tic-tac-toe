import { Socket } from "socket.io-client";

export type User = {
  id: string;
  name: string;
};

export type Room = {
  users: User[];
};

export type Rooms = {
  [roomId: string]: Room;
};

export type NameContextType = {
  name?: string;
  updateName?: (newName: string) => void;
  setRename?: (value: boolean) => void;
  rename?: boolean;
};

export type ActionProps = {
  isMultiplayer?: boolean;
  setShowroom: (value: boolean) => void;
  leaveRoom?: () => void;
  resetGame: () => void;
};

export type Score = { X: number; O: number; D: number };

export type IndicatorProps = {
  isXNext: boolean;
  myTurn?: string;
  winningCount: Score;
  isMultiplayer?: boolean;
};

export type CreateRoomType = {
  showRoom: boolean;
  setShowroom: (value: boolean) => void;
};

export type MatchAlertType = {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  type: string;
  winner: string;
  resetGame: () => void;
};

export type SocketContextType = {
  socket?: any;
  createNewRoom?: (roomId: string) => void;
  roomid?: string;
  leaveRoom?: () => void;
  isMultiplayer?: boolean;
  joinRoom?: (roomId: string) => void;
  setIsMultiplayer?: (value: boolean) => void;
  myTurn?: string;
};
