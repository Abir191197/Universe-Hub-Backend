"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaymentRequest = sendPaymentRequest;
exports.verifyPayment = verifyPayment;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../config"));
const url = config_1.default.PAYMENT_URL;
const headers = {
    "Content-Type": "application/json",
};
// Function to send payment request
function sendPaymentRequest(paymentData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Construct the payload dynamically
        var _a;
        const payload = {
            store_id: config_1.default.STORE_ID,
            signature_key: config_1.default.SIGNATURE_KEY,
            tran_id: paymentData.id,
            success_url: `https://universe-hub-backend.vercel.app/api/payment/confirmation?bookingId=${paymentData.id}&status=success`,
            fail_url: `https://universe-hub-backend.vercel.app/api/payment/confirmation?bookingId=${paymentData.id}&status=failed`,
            cancel_url: "/",
            amount: (_a = paymentData === null || paymentData === void 0 ? void 0 : paymentData.amount) === null || _a === void 0 ? void 0 : _a.toFixed(2),
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
            const response = yield axios_1.default.post(url, payload, {
                headers: headers,
            });
            return response.data;
        }
        catch (error) {
            console.error("Error sending payment request:", error);
            throw new Error("Failed to send payment request.");
        }
    });
}
// Function to verify payment
function verifyPayment(tnxId) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifyUrl = `${config_1.default.PAYMENT_VERIFY_URL}`;
        try {
            const response = yield axios_1.default.get(verifyUrl, {
                params: {
                    store_id: config_1.default.STORE_ID,
                    signature_key: config_1.default.SIGNATURE_KEY,
                    type: "json",
                    request_id: tnxId,
                },
            });
            return response.data;
        }
        catch (error) {
            console.error("Payment validation failed:", error);
            throw new Error("Payment validation failed.");
        }
    });
}
