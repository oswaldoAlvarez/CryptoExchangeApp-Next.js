import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface UseAuthFormOptions<T> {
  endpoint: string;
  transform?: (values: T) => unknown;
  onSuccessRedirect: string;
  validate?: (values: T) => string | null;
}

export function useAuthForm<T extends Record<string, string>>({
  endpoint,
  transform,
  onSuccessRedirect,
  validate,
}: UseAuthFormOptions<T>) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const values = Array.from(form.elements)
      .filter(
        (el): el is HTMLInputElement =>
          (el as HTMLInputElement).name !== undefined
      )
      .reduce((acc, el) => {
        const inp = el as HTMLInputElement;
        acc[inp.name] = inp.value;
        return acc;
      }, {} as Record<string, string>) as T;

    if (validate) {
      const msg = validate(values);
      if (msg) {
        setError(msg);
        setLoading(false);
        return;
      }
    }

    try {
      const body = transform ? transform(values) : values;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || json.message || "Error en el servidor");
      } else {
        router.push(onSuccessRedirect);
      }
    } catch (err) {
      console.error(err);
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
