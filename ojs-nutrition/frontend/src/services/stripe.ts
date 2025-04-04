import { apiRequest } from "./apiHelper";

export const createStripePayment = async (
  OrderId: number,
  amount: number
): Promise<string> => {
  try {
    const response = await apiRequest<{clientSecret: string;OrderId: number;amount: number;}>("POST", "/payment/checkout-session", {
      OrderId,
      amount,
      clientSecret: "",
    });
    console.log("createStripePayment", response.data);
    console.log("createStripePaymenturl", response.data.url);
    return response.data.url;
  } catch (error) {
    console.error("Error creating Stripe payment:", error);
    throw new Error("Stripe ödeme isteği oluşturulamadı.");
  }
};
