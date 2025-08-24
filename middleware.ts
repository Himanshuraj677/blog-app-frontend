import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/profile") || req.nextUrl.pathname.startsWith("/dashboard");

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Specify which routes to run middleware on
export const config = {
  matcher: ["/", "/profile", "/dashboard/:path*"],
};
