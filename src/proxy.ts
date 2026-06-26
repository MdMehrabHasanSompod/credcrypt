import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth()
    const publicRoutes = ["/about", "/help", "/services"];
    const authenticationRoutes = ["/login", "/register"];
    const allowedFrontendRoutes: string[] = ["/user",];
    const allowedApiRoutes: string[] = ["/api/user",];


    if (publicRoutes.some((r) => pathname.startsWith(r))) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    if (authenticationRoutes.some((r) => pathname.startsWith(r))) {
        if (session?.user.id) {
            return NextResponse.redirect(
                new URL("/user/dashboard", request.url)
            );
        }
        return NextResponse.next();
    }

    if (pathname.startsWith("/api")) {

        if (!session?.user.id) {
            return NextResponse.json(
                { success: false, message: "Attempted to Unauthorized Access" },
                { status: 401 }
            );
        }

        if (!allowedApiRoutes.some((r) => pathname.startsWith(r))) {
            return NextResponse.json(
                { success: false, message: "Denied Forbidden API Access" },
                { status: 403 }
            );
        }
        return NextResponse.next();
    }

    if (!session?.user.id) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    if (!allowedFrontendRoutes.some((r) => pathname.startsWith(r))) {
        return NextResponse.redirect(
            new URL("/user/dashboard", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/:path*",
        "/user/:path*",
        "/login",
        "/register",
    ],
};