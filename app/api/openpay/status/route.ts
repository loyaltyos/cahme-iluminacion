import { NextResponse } from "next/server";
import { getOpenpayConfig, hasOpenpayServerCredentials } from "@/lib/openpay-config";

export async function GET() {
  const config = getOpenpayConfig();

  return NextResponse.json({
    enabled: hasOpenpayServerCredentials(),
    merchantId: config.merchantId,
    publicKey: config.publicKey
  });
}
