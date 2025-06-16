import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { CryptoList } from "./components/cryptoList/CryptoList.component";

export const HomeScreen = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <main className="p-8">
      <CryptoList />
    </main>
  );
};
