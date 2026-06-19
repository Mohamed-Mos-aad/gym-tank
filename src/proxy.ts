import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("gym_tank_token")?.value;
    const role = request.cookies.get("gym_tank_role")?.value;
    const { pathname } = request.nextUrl;

    // 1. Allow public assets and login page
    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico") {
        return NextResponse.next();
    }

    const isAuthPage = pathname.startsWith("/login");
    const isAdminPath = pathname.startsWith("/admin");
    const isUserPath = pathname.startsWith("/user");

    // 2. Not logged in -> Redirect to login if trying to access protected paths
    if (!token && (isAdminPath || isUserPath)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. Logged in -> Redirect away from login page to respective dashboard
    if (token && isAuthPage) {
        if (role === "ADMIN") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/user", request.url));
    }

    // 4. Role-based Access Control
    if (token) {
        // Admin trying to access user pages -> Redirect to admin
        if (isUserPath && role === "ADMIN") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        // Gym Owner trying to access admin pages -> Redirect to user
        if (isAdminPath && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/user", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
