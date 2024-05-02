import asyncHandler from "../middlewares/asyncHandler.js";
import Menu from "../models/menuModel.js";
import Category from "../models/categoryModel.js";
const getMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.find({}).populate("category");
  res.json(menu);
});

const getItemById = asyncHandler(async (req, res) => {
  const item = await Menu.findById(req.params.id).populate("category", "name");
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("item Not Found");
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Menu.findById(req.params.id);

  if (item) {
    await Menu.deleteOne({ _id: item._id });
    res.json({ message: "removed" });
  } else {
    res.status(404);
    throw new Error(" not found");
  }
});

const createItem = asyncHandler(async (req, res) => {
  const {
    userId,
    name,
    category,
    image,
    description,
    options,
    price,
    toppings,
  } = req.body;
  const item = new Menu({
    createdBy: userId,
    name,
    category,
    image,
    description,
    options,
    price,
    toppings,
  });
  try {
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    console.log(error);
  }
});

const updateItem = asyncHandler(async (req, res) => {
  const { name, category, options, image, description, price, toppings } =
    req.body;

  const item = await Menu.findById(req.params.id);

  if (item) {
    item.name = name;
    item.price = price;
    item.description = description;
    item.options = options;
    item.image = image;
    item.category = category;
    item.toppings = toppings;
    const updateditem = await item.save();
    res.json(updateditem);
  } else {
    res.status(404);
    throw new Error("item not found");
  }
});

export { getMenu, getItemById, deleteItem, updateItem, createItem };
