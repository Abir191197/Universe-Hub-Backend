import { readFileSync } from "fs";
import { join } from "path";
import CounselingModel from "../One To One Counselling/counseling.model";
import { sendSmsToUser } from "../One To One Counselling/SmsSend";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (bookingId: string, status: string) => {
  console.log(`Booking ID: ${bookingId}`);
  console.log(`Status: ${status}`);

  try {
    // Verify the payment status using the transaction/order ID
    const verifyResponse = await verifyPayment(bookingId);
    console.log(`Verify Response: ${JSON.stringify(verifyResponse)}`);

    let statusMessage: string;
    let templateFile: string;

    if (status === "success" && verifyResponse.pay_status === "Successful") {
      statusMessage = "Payment successful";
      templateFile = "ConfirmationSuccess.html";

      // Update the payment status in the database
      const booking = await CounselingModel.findByIdAndUpdate(
        bookingId,
        { isPayment: true },
        { new: true } // Return the updated document
      ).exec();

      if (booking) {
        // Send SMS confirmation after booking is confirmed
        try {
          const messageData = {
            CounsellorName: booking.CreateBy,
            BookingName: booking.BookedByName,
            MeetLink: booking.MeetLink,
            RoomNumber: booking.StudyRoomNumber,
            selectDate: booking.selectDate,
          };
          console.log(messageData);
          await sendSmsToUser(booking.BookedByPhone, messageData);
         
        } catch (error) {
          console.error("Failed to send SMS:", error);
          
        }
      } else {
        throw new Error("Booking not found after payment confirmation");
      }
    } else if (verifyResponse.pay_status === "Failed") {
      statusMessage = "Payment failed";
      templateFile = "ConfirmationFailure.html";

      // Update the payment status in the database
      await CounselingModel.findByIdAndUpdate(bookingId, {
        isPayment: false,
        isBooked: false,
        BookedBy: null,
        BookedByName: null,
        BookedByPhone: null,
        BookedByEmail: null,
      }).exec();
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
