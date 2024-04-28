import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "user",
    lastName: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "test",
    lastName: "user",
    email: "tuser@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
