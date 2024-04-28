const pizzas = [
  {
    name: "Margherita",
    description:
      "Classic Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",

    category: "pizza",
    toppings: ["Tomato Sauce", "Mozzarella Cheese", "Fresh Basil"],
    options: ["Small", "Medium", "Large"],
    price: [10, 11, 12],
    stock: 10,
    image: "/images/1.jpg",
  },
  {
    name: "Pepperoni",
    description:
      "Traditional pizza with spicy pepperoni slices, tomato sauce, and mozzarella cheese.",

    category: "Meat Lovers",
    toppings: ["Tomato Sauce", "Mozzarella Cheese", "Pepperoni Slices"],
    options: ["Small", "Medium", "Large"],
    price: [12.99, 13.99, 14.99],
    stock: 10,
    image: "/images/2.jpg",
  },
  {
    name: "BBQ Chicken",
    description:
      "Tangy BBQ sauce topped with grilled chicken, red onions, and cilantro.",

    category: "pizza",
    toppings: ["BBQ Sauce", "Grilled Chicken", "Red Onions", "Cilantro"],
    options: ["Small", "Medium", "Large"],
    price: [12.99, 13.99, 14.99],
    stock: 20,
    image: "/images/3.jpg",
  },
  {
    name: "Vegetarian Supreme",
    description:
      "Loaded with a variety of fresh vegetables including bell peppers, onions, mushrooms, and olives.",

    category: "pizza",
    toppings: [
      "Tomato Sauce",
      "Mozzarella Cheese",
      "Bell Peppers",
      "Onions",
      "Mushrooms",
      "Olives",
    ],
    stock: 20,
    options: ["Small", "Medium", "Large"],
    price: [12.99, 13.99, 14.99],
    image: "/images/1.jpg",
  },
  {
    name: "Hawaiian",
    description:
      "A tropical delight with ham, pineapple chunks, and mozzarella cheese.",

    category: "pizza",
    toppings: ["Tomato Sauce", "Mozzarella Cheese", "Ham", "Pineapple Chunks"],
    options: ["Small", "Medium", "Large"],
    price: [12.99, 13.99, 14.99],
    stock: 12,
    image: "/images/2.jpg",
  },
  {
    name: "Meat Feast",
    description:
      "For meat lovers! Piled high with pepperoni, sausage, ham, and bacon.",

    category: "pizza",
    toppings: [
      "Tomato Sauce",
      "Mozzarella Cheese",
      "Pepperoni",
      "Sausage",
      "Ham",
      "Bacon",
    ],
    stock: 11,
    price: [12.99, 13.99, 14.99],
    options: ["Small", "Medium", "Large"],
    image: "/images/3.jpg",
  },
  {
    name: "Nuggets",
    description:
      "grilled chicken topped with Tangy BBQ sauce, red onions, and cilantro.",

    category: "sides",
    stock: 11,
    options: ["8 count", "12 count"],
    price: [5.4, 6.9],
    image: "/images/4.jpg",
  },
  {
    name: "pepsi",
    description: "Refeshing Soda",

    category: "beverage",
    stock: 12,
    options: ["Small", "Medium", "Large"],
    price: [3.5, 5.4, 6.9],
    image: "/images/5.jpg",
  },
];

export default pizzas;
