// log from 1 to 100 with 1000 milliseconds delay

import { NextResponse } from "next/server";

export async function GET() {
  for (let i = 1; i <= 100; i++) {
    console.log(`INFO: Log entry ${i}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return NextResponse.json({ message: "Logs generated" });
}
