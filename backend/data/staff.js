import bcrypt from "bcryptjs";

const staff = [
  {
    firstName: "admin",
    lastName: "user",
    email: "admin@gmail.com",
    ssn: "12345678",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
  },
  {
    firstName: "staff",
    lastName: "user",
    email: "staff@gmail.com",
    ssn: "12345679",
    password: bcrypt.hashSync("123456", 10),
    role: "staff",
  },
  {
    firstName: "delivery",
    lastName: "boy",
    email: "db@gmail.com",
    ssn: "12345679",
    password: bcrypt.hashSync("123456", 10),
    role: "delivery",
  },
];

export default staff;
