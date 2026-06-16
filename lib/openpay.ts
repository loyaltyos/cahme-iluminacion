export type OpenpayCheckoutPayload = {
  orderId: string;
  amount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
};

export async function createOpenpayCharge(payload: OpenpayCheckoutPayload) {
  void payload;

  throw new Error(
    "Openpay credentials are required before creating charges."
  );
}
