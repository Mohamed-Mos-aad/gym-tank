import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (process.env.NODE_ENV === "development") {
        return NextResponse.next();
    }


    const token = request.cookies.get("gym_tank_token")?.value;

    const pathname = request.nextUrl.pathname;

    const isAuthPage = pathname.startsWith("/login");
    const isProtected = pathname.startsWith("/user") || pathname.startsWith("/admin");



    if (!token && isProtected) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/user", request.url));
    }
console.log("MIDDLEWARE HIT:", request.nextUrl.pathname);

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*", "/user", "/admin/:path*", "/admin", "/login"],
};
