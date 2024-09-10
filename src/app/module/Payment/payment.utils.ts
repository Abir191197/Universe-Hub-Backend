import axios from "axios";
import config from "../../../config";

// Define the type for payment data
export interface PaymentData {
  id: string;
  amount?: number|undefined;
  UserName: string;
  UserEmail: string;
  UserPhone: string;
  UserAddress?: string;
}

const url = config.PAYMENT_URL;

const headers = {
  "Content-Type": "application/json",
};

// Function to send payment request
export async function sendPaymentRequest(paymentData: PaymentData) {
  // Construct the payload dynamically
  
  const payload = {
    store_id: config.STORE_ID,
    signature_key: config.SIGNATURE_KEY,
    tran_id: paymentData.id,
    success_url: `https://universe-hub-backend.vercel.app/payment/confirmation?bookingId=${paymentData.id}&status=success`,
    fail_url: `https://universe-hub-backend.vercel.app/payment/confirmation?bookingId=${paymentData.id}&status=failed`,
    cancel_url: "/",
    amount: paymentData?.amount?.toFixed(2),
    currency: "BDT",
    desc: "Payment",
    cus_name: paymentData.UserName,
    cus_email: paymentData.UserEmail,
    cus_add1: paymentData.UserAddress || "", // Default to empty string if not provided
    cus_add2: "",
    cus_city: "",
    cus_state: "",
    cus_postcode: "",
    cus_country: "",
    cus_phone: paymentData.UserPhone.toString(),
    type: "json",
  };

  try {
    const response = await axios.post(url as string, payload, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending payment request:", error);
    throw new Error("Failed to send payment request.");
  }
}

// Function to verify payment
export async function verifyPayment(tnxId: string) {
  const verifyUrl = `${config.PAYMENT_VERIFY_URL}`;

  try {
    const response = await axios.get(verifyUrl, {
      params: {
        store_id: config.STORE_ID,
        signature_key: config.SIGNATURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Payment validation failed:", error);
    throw new Error("Payment validation failed.");
  }
}
