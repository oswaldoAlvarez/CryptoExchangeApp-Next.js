import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        if (!creds) return null;
        const user = await prisma.user.findUnique({
          where: { email: creds.email },
        });
        if (!user) return null;
        const ok = await bcrypt.compare(creds.password, user.passwordHash);
        return ok ? { id: user.id, email: user.email } : null;
      },
    }),
  ],
  pages: { signIn: "/login" },
};
