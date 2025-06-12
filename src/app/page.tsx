import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LogoutButton, ThemeToggle } from "@/components";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold dark:text-white">
        Hola {session.user?.email}
      </h1>
      <p className="dark:text-gray-100">
        Solo ves esto porque superaste el middleware
      </p>
      <ThemeToggle />
      <LogoutButton />
    </main>
  );
}
