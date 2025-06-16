"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => (
  <button
    onClick={() => signOut({ callbackUrl: "/login" })}
    className="ml-4 rounded px-4 py-2"
  >
    Logout
  </button>
);
