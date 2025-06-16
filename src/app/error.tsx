"use client";

import { Text } from "@/components";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-sm w-full space-y-6 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 dark:bg-red-200 p-4">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-700" />
          </div>
        </div>
        <Text
          tag="h1"
          className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100"
        >
          ¡Ups… Algo salió mal!
        </Text>
        <Text
          tag="p"
          className="text-center text-sm text-gray-600 dark:text-gray-300"
        >
          {error.message || "Ha ocurrido un error inesperado."}
        </Text>
        <div className="flex justify-center">
          <button
            onClick={reset}
            className="flex items-center p-12 gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </main>
  );
}
