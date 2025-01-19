import { NextResponse } from "next/server";
import AuthService from "./modules/auth-module";

export function middleware(request) {
  const accessToken = request.cookies?.get("token")?.value;

  if (accessToken && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (accessToken && request.nextUrl.pathname.includes("/dashboard")) {
    if (!AuthService.isSessionValid()) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!accessToken && request.nextUrl.pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
