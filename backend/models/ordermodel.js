import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderType: {
      type: String,
      required: true,
      default: "Online",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu",
        },
      },
    ],
    deliveryAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Payment",
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    deliveryPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Preparing",
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    deliveredBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Staff",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
