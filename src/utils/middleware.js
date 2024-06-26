import { NextResponse } from "next/server";
import { store } from "./store";
import Cookies from "js-cookie";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let token  = request.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/menu","/countInventory", "/roles"],
};
