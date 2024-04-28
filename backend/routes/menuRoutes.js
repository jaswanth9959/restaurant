import express from "express";
const router = express.Router();
import {
  createItem,
  deleteItem,
  getItemById,
  getMenu,
  updateItem,
} from "../controllers/menuController.js";
router.route("/").get(getMenu).post(createItem);
router.route("/:id").delete(deleteItem).get(getItemById).put(updateItem);

export default router;
