import { Request, Response } from "express";
import { paymentServices } from "./payment.service";
import catchAsync from "../../utils/catchAsync";


const confirmationPayment = catchAsync(async (req: Request, res: Response) => {
  const { bookingId, status } = req.query;
  console.log(bookingId);
  console.log(status);
  try {
    // Validate query parameters
    if (typeof bookingId !== "string" || typeof status !== "string") {
      return res.status(400).send("Invalid query parameters");
    }

    // Call the service to get the confirmation template
    const result = await paymentServices.confirmationService(bookingId, status);

    // Set content-type to HTML
    res.setHeader("Content-Type", "text/html");

    // Send the HTML response
    res.send(result);
  } catch (error) {
    console.error("Error in confirmationPayment:", error);
    res
      .status(500)
      .send("An error occurred while processing your payment confirmation.");
  }
});



export const PaymentController = {
  confirmationPayment,
  
};
