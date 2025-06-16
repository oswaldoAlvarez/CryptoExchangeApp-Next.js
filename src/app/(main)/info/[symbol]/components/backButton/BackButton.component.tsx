"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Text } from "@/components";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <button onClick={handleBack} className="flex items-center mb-4">
      <ArrowLeft size={16} />
      <Text tag="h1" className="ml-2">Volver</Text>
    </button>
  );
}
