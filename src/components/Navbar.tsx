"use client";

import { useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameContext } from "@/context/NameContext";
export function Navbar() {
  const { setTheme } = useTheme();
  const [nickname, setNickname] = useState("");
  const context: any = useContext(NameContext);

  useEffect(() => {
    const name = context.name;

    if (name != undefined && name != null) {
      setNickname(name);
    } else {
      setNickname("User");
    }
  }, [context.name]);

  const updateName = () => {
    context.setRename(!context.rename);
  };

  return (
    <div className="flex justify-end ">
      <button
        onClick={() => updateName()}
        className="flex items-center justify-center cursor-pointer"
      >
        <p className="text-center">Welcome, {nickname}</p>
        <Avatar className="m-2 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="m-2" variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
