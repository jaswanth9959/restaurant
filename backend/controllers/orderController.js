import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import Order from "../models/ordermodel.js";
import Payment from "../models/paymentModel.js";

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    deliveryPrice,
    totalPrice,
    pickup,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  }

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      menuItem: x._id,
      price: x.price[x.selectedId],
      _id: undefined,
    })),
    user: req.user._id,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    deliveryPrice,
    pickup,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const createCounterOrder = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    orderItems,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    deliveryPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password: "test",
  });
  const createdUser = await user.save();

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      menuItem: x._id,
      price: x.price[x.selectedId],
      _id: undefined,
    })),

    user: createdUser._id,
    deliveryAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    deliveryPrice,
    totalPrice,
    orderType: "Counter",
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  const payment = new Payment({ id: order.user, updated_time: Date.now() });
  const createdPayment = await payment.save();

  if (order) {
    order.isPaid = true;
    order.paymentID = createdPayment._id;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.orderStatus === "Preparing") {
      order.orderStatus = "Ready";
    } else {
      order.orderStatus = "Delivered";
      order.deliveredAt = Date.now();
    }

    const updatedorder = await order.save();

    res.json(updatedorder);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.status(200).json(orders);
});

const getOnlineOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ orderType: "Online" }).populate("user");
  res.status(200).json(orders);
});

const getCounterOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ orderType: "Counter" }).populate("user");
  res.status(200).json(orders);
});
export {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateStatus,
  getAllOrders,
  getCounterOrders,
  getOnlineOrders,
  createCounterOrder,
};
