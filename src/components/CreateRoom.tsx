"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSocket } from "@/context/SocketContext";
import { CreateRoomType, SocketContextType } from "@/types/type";

export function CreateRoom({ showRoom, setShowroom }: CreateRoomType) {
  const [roomcreated, setRoomCreated] = useState(false);
  const [joinroomid, setJoinRoomid] = useState("");
  const { toast } = useToast();
  let { createNewRoom, roomid, joinRoom }: SocketContextType = useSocket();

  function generateRandomId(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleNewRoom = () => {
    let randomId = generateRandomId(12);
    setRoomCreated(true);
    createNewRoom?.(randomId);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomid as string);
    toast({
      title: "Roomid Copied..",
    });
  };

  const handleJoinRoom = () => {
    if (joinroomid == "") return;

    joinRoom?.(joinroomid);
    setShowroom(false);
    toast({
      title: "Room Joined Successfully",
    });
  };

  useEffect(() => {
    setRoomCreated(false);
  }, [showRoom]);

  return (
    <Dialog open={showRoom} onOpenChange={setShowroom}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Play With Friend</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="createroom" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="joinroom">Join Room</TabsTrigger>
            <TabsTrigger value="createroom">Create a Room</TabsTrigger>
          </TabsList>
          <TabsContent value="joinroom">
            <div className="grid gap-3 py-3">
              <div className="grid grid-cols-3 gap-3">
                <Input
                  onChange={(e) => setJoinRoomid(e.target.value)}
                  id="roomid"
                  className="col-span-3"
                  placeholder="Paste room id here"
                />
              </div>
              <Button onClick={() => handleJoinRoom()}>Join Room</Button>
            </div>
          </TabsContent>
          <TabsContent value="createroom">
            <div className="grid gap-3 py-3">
              {roomcreated ? (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      defaultValue={roomid}
                      readOnly
                      id="nickname"
                      className="col-span-3"
                    />
                  </div>
                  <Button onClick={() => handleCopyClick()}>
                    Copy Room id
                  </Button>
                </>
              ) : (
                <Button onClick={() => handleNewRoom()}>Create New Room</Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
