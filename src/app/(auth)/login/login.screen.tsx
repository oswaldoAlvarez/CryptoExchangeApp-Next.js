"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Text } from "@/components";
import { useLoginForm } from "@/hooks";
import { Eye, EyeOff } from "lucide-react";

export const LoginScreen = () => {
  const { handleSubmit, error } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow dark:bg-gray-800"
      >
        <Text
          tag="h1"
          className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          Iniciar sesión
        </Text>
        <Text
          tag="label"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </Text>
        <Text
          tag="label"
          className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Contraseña
          <div className="relative mt-1">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full rounded border border-gray-300 pr-10 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <EyeOff
                  size={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              ) : (
                <Eye size={20} className="text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </Text>
        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Entrar
        </button>
        <Text
          tag="p"
          className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          ¿No tienes cuenta?
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400 ml-1"
          >
            Regístrate
          </Link>
        </Text>
      </form>
    </main>
  );
};
