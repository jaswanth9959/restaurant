import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/:id").get(getUserById).put(updateUser);

export default router;
