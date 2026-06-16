import { NextResponse } from "next/server";
import { hasOpenpayServerCredentials } from "@/lib/openpay-config";

export async function GET() {
  return NextResponse.json({
    enabled: hasOpenpayServerCredentials()
  });
}
