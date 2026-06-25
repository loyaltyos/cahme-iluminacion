export type OpenpayConfig = {
  merchantId: string;
  privateKey: string;
  publicKey: string;
  siteUrl: string;
};

export function getOpenpayConfig(): OpenpayConfig {
  return {
    merchantId: process.env.OPENPAY_MERCHANT_ID ?? "",
    privateKey: process.env.OPENPAY_PRIVATE_KEY ?? "",
    publicKey: process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_KEY ?? "",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  };
}

export function hasOpenpayServerCredentials() {
  const config = getOpenpayConfig();
  return Boolean(config.merchantId && config.privateKey && config.publicKey);
}
