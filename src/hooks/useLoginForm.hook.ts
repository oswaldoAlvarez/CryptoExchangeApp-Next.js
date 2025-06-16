import { useState, FormEvent } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function useLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
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

    if (res?.ok) {
      router.push(res.url ?? callbackUrl);
    } else {
      setError("Email o contraseña incorrectos");
    }
  }

  return { handleSubmit, error };
}
