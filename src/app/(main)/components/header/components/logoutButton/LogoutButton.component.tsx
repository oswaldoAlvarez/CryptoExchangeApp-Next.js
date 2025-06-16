"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="ml-4 rounded px-4 py-2 bg-transparent text-gray-700 dark:text-gray-200 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800  active:bg-gray-200 dark:active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
  >
    Logout
  </button>
);
