import React from "react";
import { ThemeToggle } from "./components/themeToggle/ThemeToggle.component";
import { LogoutButton } from "./components/logoutButton/LogoutButton.component";

export const Header = () => {
  return (
    <div className="h-20 w-[100%] flex justify-between items-center border-b border-gray-200">
      <div className="h-[100%] w-[50%] flex items-center justify-center">
        <h1 className="text-2xl font-bold">MyApp</h1>
      </div>
      <div className="h-[100%] w-[50%] flex items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <p className="mr-1 lg:block hidden">Cambiar tema:</p>
          <ThemeToggle />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
