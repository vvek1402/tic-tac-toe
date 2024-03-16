"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NameContext } from "@/context/NameContext";
import { useContext, useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

export function NicknameDialog() {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const { toast } = useToast();

  const context: any = useContext(NameContext);
  useEffect(() => {
    const name = context.name;

    if (name == undefined || name == "") {
      setOpen(true);
    } else {
      setNickname(name);
      setOpen(false);
    }
  }, [context.name]);

  useEffect(() => {
    const rename = context.rename;

    if (!rename) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [context.rename]);

  const saveNickname = () => {
    if (nickname == "") return;
    context.updateName(nickname);
    setOpen(false);
  };

  const checkNameIsAdded = () => {
    if (nickname == "") {
      toast({
        variant: "destructive",
        title: "Please add a nickname",
      });
      setOpen(true);
      return false;
    } else {
      setOpen(false);
      return true;
    }
    

  };

  return (
    <Dialog open={open} onOpenChange={checkNameIsAdded}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nickname</DialogTitle>
          <DialogDescription>
            Set Your nickname. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nickname" className="text-right">
              Nickname
            </Label>
            <Input
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
              id="nickname"
              className="col-span-3"
              maxLength={10}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => saveNickname()} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}