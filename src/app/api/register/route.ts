import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  const hashPwd = await hash(password, 10);

  await prisma.user.create({
    data: { email, name, passwordHash: hashPwd },
  });

  return NextResponse.json({ ok: true });
}
