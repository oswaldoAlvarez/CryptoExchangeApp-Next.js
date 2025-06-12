"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="mt-4 rounded bg-gray-800 px-4 py-2 text-white"
  >
    Salir
  </button>
);
