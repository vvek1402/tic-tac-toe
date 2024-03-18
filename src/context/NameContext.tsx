"use client";
import { NameContextType } from "@/types/type";
import React, { createContext, useState, useEffect, useContext } from "react";

export const NameContext = createContext<NameContextType | undefined>(
  undefined
);

const NameProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [name, setName] = useState<string>("");
  const [rename, setRename] = useState<boolean>(false);

  const updateName = (newName: string) => {
    localStorage.setItem("userName", newName);
    setName(newName);
    setRename(false);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <NameContext.Provider value={{ name, updateName, setRename, rename }}>
      {children}
    </NameContext.Provider>
  );
};

export { NameProvider };
