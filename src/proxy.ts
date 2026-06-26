import { NextResponse } from "next/server";

export default function middleware() {
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