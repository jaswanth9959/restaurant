import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrderToPaid,
  getAllOrders,
  updateStatus,
  getCounterOrders,
  getOnlineOrders,
  createCounterOrder,
} from "../controllers/orderController.js";
router.route("/").post(protect, createOrder).get(getAllOrders);
router.route("/counter").get(getCounterOrders).post(createCounterOrder);
router.route("/online").get(getOnlineOrders);
router.route("/:id").get(getOrderById).put(updateStatus);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/mine/:id").get(getMyOrders);
export default router;
