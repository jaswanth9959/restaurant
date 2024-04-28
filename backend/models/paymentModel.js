import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    id: { type: String },
    updated_time: { type: String },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
