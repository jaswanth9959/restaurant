import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "john",
    lastName: "doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "jane",
    lastName: "doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
