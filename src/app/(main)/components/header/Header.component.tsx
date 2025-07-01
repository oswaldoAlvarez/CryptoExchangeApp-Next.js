import React from "react";
import { ThemeToggle } from "./components/themeToggle/ThemeToggle.component";
import { LogoutButton } from "./components/logoutButton/LogoutButton.component";
import { Text } from "@/components";

export const Header = () => {
  return (
    <div className="h-20 w-[100%] flex justify-between items-center border-b border-gray-200">
      <div className="h-[100%] w-[50%] flex items-center justify-center">
        <Text tag="h1" className="text-2xl font-bold">CryptoExchangeApp</Text>
      </div>
      <div className="h-[100%] w-[50%] flex items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <Text tag="p" className="mr-1 lg:block hidden">Cambiar tema:</Text>
          <ThemeToggle />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
