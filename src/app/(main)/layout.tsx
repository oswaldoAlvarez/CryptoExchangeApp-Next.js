import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/header/Header.component";

export const metadata: Metadata = {
  title: "CryptoApp",
  description: "Building crypto app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />
      {children}
    </ThemeProvider>
  );
}
