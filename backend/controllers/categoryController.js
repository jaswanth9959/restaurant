import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
const getCategories = asyncHandler(async (req, res) => {
  const category = await Category.find({});
  res.json(category);
});

export { getCategories };
