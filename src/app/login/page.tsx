"use client";

import { useState, FormEvent } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

interface LoginPageProps {}

export default function LoginPage({}: LoginPageProps) {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = (await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    })) as SignInResponse | undefined;

    if (res?.ok) router.push(res.url ?? callbackUrl);
    else setError("Email o contraseña incorrectos");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow dark:bg-gray-800"
      >
        <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Iniciar sesión
        </h1>

        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </label>

        <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contraseña
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </label>

        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Entrar
        </button>
      </form>
    </main>
  );
}
