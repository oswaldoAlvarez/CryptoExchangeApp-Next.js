import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("MIDDLEWARE → session?", !!session, req.nextUrl.pathname);

  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
