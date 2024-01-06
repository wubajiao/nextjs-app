/*
 * @Descripttion : 
 * @Author       : wuhaidong
 * @Date         : 2023-12-29 15:49:12
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2024-01-06 23:29:49
 */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
export function GET() {
  // throw new Error("Sentry Example API Route Error");
  return NextResponse.json({ data: "Testing Sentry Error..." });
}
