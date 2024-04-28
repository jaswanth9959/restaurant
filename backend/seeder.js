import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import pizzas from "./data/pizzas.js";
import staff from "./data/staff.js";
import categories from "./data/category.js";
import User from "./models/userModel.js";
import Menu from "./models/menuModel.js";
import Staff from "./models/staffModel.js";
import Category from "./models/categoryModel.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Menu.deleteMany();
    await Staff.deleteMany();
    await Category.deleteMany();

    await User.insertMany(users);
    const createdCategories = await Category.insertMany(categories);
    const createdStaff = await Staff.insertMany(staff);

    const adminStaff = createdStaff[0]._id;

    const samplePizzas = pizzas.map((pizza) => {
      return {
        ...pizza,
        createdBy: adminStaff,
        category: createdCategories[0]._id,
      };
    });

    await Menu.insertMany(samplePizzas);

    console.log("---DATA HAS BEEN IMPORTED---");
    process.exit();
  } catch (error) {
    console.log("---IMPORT FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Menu.deleteMany();
    await Staff.deleteMany();
    await Category.deleteMany();

    console.log("---DATA HAS BEEN DESTROYED---");
    process.exit();
  } catch (error) {
    console.log("---DESTROY FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
