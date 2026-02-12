import { NextResponse } from "next/server";

export async function GET() {
  console.log("INFO: Hello endpoint called", {
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({
    message: "Hello from tenant-logs test endpoint",
    timestamp: new Date().toISOString(),
  });
}
