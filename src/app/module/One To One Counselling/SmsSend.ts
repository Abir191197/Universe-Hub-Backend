import axios from "axios";

// Function to format the date from messageData
function formatDate(date: any) {
  if (!date) return "N/A"; // Fallback if date is undefined or null
  const d = new Date(date); // Convert to Date object
  const formattedDate = d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate}, ${formattedTime}`;
}

// Exportable SMS sending function
export async function sms_send(number: any, messageData: any) {
  const url = "http://bulksmsbd.net/api/smsapi";

  // Replace with your actual API details
  const api_key = "lcI1DOez8rmti0mWham4"; // API key
  const senderid = "8809617620235"; // Sender ID

  // Customizing the message with details from messageData
  const message = `Dear ${messageData.BookingName || "User"},
Your booking has been confirmed!
Counsellor: ${messageData.CounsellorName || "N/A"}
Meet Link: ${messageData.MeetLink || "N/A"}
Room Number: ${messageData.RoomNumber || "N/A"}
Date: ${formatDate(messageData.selectDate)}`;
  // Include formatted date

  try {
    // Making GET request using Axios with query parameters
    const response = await axios.get(url, {
      params: {
        api_key: api_key,
        type: "text", // Assuming you are sending a text message
        number: number, // Using the passed-in number
        senderid: senderid,
        message: message, // Sending the dynamically generated message
      },
    });

    // Log the response from the API for debugging
    console.log("SMS API Response:", response.data);

    if (response.status === 200) {
      return response.data; // Return the response data from the API
    } else {
      throw new Error(
        `SMS sending failed with status code: ${response.status}`
      );
    }
  } catch (error) {
    // Type narrowing for 'unknown' error type
    if (error instanceof Error) {
      console.error(
        "Error sending SMS:",
        (error as any).response?.data || error.message
      );
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
}

// Function to send SMS after successful booking confirmation
export async function sendSmsToUser(userNumber: any, messageData: any) {
  try {
    const response = await sms_send(userNumber, messageData);
    console.log("SMS sent successfully:", response);
  } catch (error) {
    // Type narrowing for 'unknown' error type
    if (error instanceof Error) {
      console.error(
        "Failed to send SMS:",
        (error as any).response?.data || error.message
      );
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
}
