import { readFileSync } from "fs";
import { join } from "path";

import { verifyPayment } from "./payment.utils";
import CounselingModel from "../One To One Counselling/counseling.model";


const confirmationService = async (bookingId: string, status: string) => {

  console.log(bookingId);
  console.log(status);
  try {
    // Verify the payment status using the transaction/order ID
    const verifyResponse = await verifyPayment(bookingId);
console.log(verifyResponse);
    let statusMessage;
    let templateFile;

    // Determine status message and template based on verification response
    if (status === "success" && verifyResponse.pay_status === "Successful") {
      statusMessage = "Payment successful";
      templateFile = "ConfirmationSuccess.html";

      // Update the payment status in the database
      await CounselingModel.findOneAndUpdate(
        { _id: bookingId },
        { isPayment: true }
      );
    } else if (verifyResponse.pay_status === "Failed") {
      statusMessage = "Payment failed";
      templateFile = "ConfirmationFailure.html";

      // Update the payment status in the database
      const result = await CounselingModel.findOneAndUpdate(
        { _id:bookingId },
        {
          isPayment: false,
          isBooked: false,
          BookedBy: null,
          BookedByName: null,
          BookedByPhone: null,
          BookedByEmail: null,
        }
      );
    } else {
      throw new Error("Unexpected payment status or response");
    }

    // Read and modify the HTML template
    const filePath = join(__dirname, `../../../views/${templateFile}`);
    let template;
    try {
      template = readFileSync(filePath, "utf-8");
    } catch (fileError) {
      console.error("Error reading template file:", fileError);
      throw new Error("Template file not found");
    }

    // Replace placeholder in the template
    template = template.replace("{{message}}", statusMessage);

    return template;
  } catch (error) {
    console.error("Error in confirmationService:", error);
    throw new Error("Failed to confirm payment");
  }
};

export const paymentServices = {
  confirmationService,
};
