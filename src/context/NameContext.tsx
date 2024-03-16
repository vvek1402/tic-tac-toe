"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

interface NameContextType {
  name: string;
  updateName: (newName: string) => void;
  setRename: any;
  rename: boolean;
}

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
