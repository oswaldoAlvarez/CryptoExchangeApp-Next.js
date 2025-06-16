import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/header/Header.component";
import { PropsWithChildren, Suspense } from "react";
import { Spinner } from "@/components";

export const metadata: Metadata = {
  title: "CryptoApp",
  description: "Building crypto app",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </ThemeProvider>
  );
}
