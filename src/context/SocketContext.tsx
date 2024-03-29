"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { NameContext } from "./NameContext";
import { NameContextType } from "@/types/type";

const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [socket, setSocket] = useState<any>(null);
  const [roomid, setRoomid] = useState("");
  const [isMultiplayer, setIsMultiplayer] = useState<boolean>(false);
  const { toast } = useToast();
  const { name } : NameContextType = useContext(NameContext) ?? {};
  const [myTurn, setMyturn] = useState<string>("X");

  let socketInstance: any;
  const connectSocket = async () => {
    await fetch("api/socket");

    socketInstance = io();

    socketInstance.on("connect", () => {
      console.log("socket is connected");
    });
    socketInstance.on("disconnect", () => {
      console.log("socket is disconnect");
    });

    setSocket(socketInstance);

    socketInstance.on("roomFull", () => {
      toast({
        variant: "destructive",
        title: "Room is Full or doesnt Exist",
        description: "Please try again later.",
      });
    });
  };

  useEffect(() => {
    connectSocket();

    if (socketInstance) {
      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  const createNewRoom = (roomid: string) => {
    socket.emit("createRoom", roomid, name);
    setRoomid(roomid);
    setMyturn("X");
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomid);
    setIsMultiplayer(false);
  };

  const joinRoom = (roomid: string) => {
    socket.emit("joinRoom", roomid, name);
    setRoomid(roomid);
    setMyturn("O");
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        createNewRoom,
        roomid,
        leaveRoom,
        isMultiplayer,
        joinRoom,
        setIsMultiplayer,
        myTurn,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
