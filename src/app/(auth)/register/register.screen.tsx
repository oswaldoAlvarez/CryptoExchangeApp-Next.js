'use client';

import React from "react";
import { Text } from "@/components";
import { useAuthForm } from "@/hooks";

export const RegisterScreen = () => {
  const { handleSubmit, loading, error } = useAuthForm<{
    name: string;
    email: string;
    password: string;
    confirm: string;
  }>({
    endpoint: "/api/register",
    onSuccessRedirect: "/login",
    validate: (v) => {
      if (!v.name || !v.email || !v.password || !v.confirm)
        return "Rellena todos los campos";
      if (v.password !== v.confirm) return "Las contraseñas no coinciden";
      return null;
    },
    transform: (keep) => keep,
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow dark:bg-gray-800"
      >
        <Text
          tag="h1"
          className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          Crear cuenta
        </Text>
        <Text
          tag="label"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nombre
          <input
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
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
        <Text className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contraseña
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </Text>
        <Text
          tag="label"
          className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirmar contraseña
          <input
            name="confirm"
            type="password"
            required
            className="mt-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </Text>
        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-green-600 py-2 font-semibold text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Creando…" : "Registrar"}
        </button>
        <Text
          tag="p"
          className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          ¿Ya tienes cuenta?
          <a
            href="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400 ml-1"
          >
            Inicia sesión
          </a>
        </Text>
      </form>
    </main>
  );
};
