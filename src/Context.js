import meal from "./images/meal.jpg";
import pilau from "./images/pilau.jpg";
import breakfast from "./images/breakfast.jpg";
import britishbreakfast from "./images/britishbreakfast.jpg";
import chapatimaini from "./images/chapatimaini.jpg";
import chickensticks from "./images/chickensticks.jpg";
import chinese from "./images/chinese.jpg";
import chipskuku from "./images/chipskuku.jpg";
import chipsnyama from "./images/chipsnyama.jpg";
import chipszege from "./images/chipszege.jpg";
import mixer from "./images/mixer.jpg";
import tanzaniansnacks from "./images/tanzaniansnacks.jpg";
import ndizi from "./images/ndizi.jpg";
import salad from "./images/salad.jpg";
import shawarma from "./images/shawarma.jpg";
import zegemishkaki from "./images/zegemishkaki.jpg";
import desserts from "./images/desserts.jpg";
import veganbreakfast from "./images/veganbreakfast.jpg";

export const user = {
  cart: [
    {
      id: 1,
      title: "Steak biryani",
      image: meal,
      price: 5000,
      inStock: 0,
      ratings: 4.5,
      category: ["Protein", "Meat", "Lunch"],
      description: "biryani with a quarter kilo of meat",
      purchased: 2,
      total: function () {
        return this.price * this.purchased;
      }
    }
  ],
  searchResults: []
};

export const menu = [
  {
    id: 1,
    title: "Steak biryani",
    image: meal,
    price: 5000,
    inStock: 0,
    ratings: 4.5,
    category: ["Protein", "Meat", "Lunch"],
    description: "biryani with a quarter kilo of meat"
  },
  {
    id: 2,
    title: "Pilau with meat",
    image: pilau,
    price: 3000,
    inStock: 0,
    ratings: 4.5,
    category: ["Protein", "Meat", "Lunch"],
    description: "You get a plate of pilau with a quarter kilo of fried meat"
  },
  {
    id: 3,
    title: "Samosas",
    image: breakfast,
    price: 2000,
    inStock: 6,
    ratings: 3.5,
    category: ["breakfast", "Snacks", "wheat"],
    description: "Fried meat samosas with roasted meat"
  },
  {
    id: 4,
    title: "British breakfast",
    image: britishbreakfast,
    price: 4000,
    inStock: 6,
    ratings: 5.0,
    category: ["Protein", "breakfast", "eggs"],
    description: "Eggs, sausage with fried beans and a slice of avocado"
  },
  {
    id: 5,
    title: "Chapati with Liver",
    image: chapatimaini,
    price: 3000,
    inStock: 6,
    ratings: 4.0,
    category: ["breakfast", "wheat", "Meat"],
    description:
      "Chapati with roasted liver, a bit of rice and a slice of avocado"
  },
  {
    id: 6,
    title: "Chicken sticks",
    image: chickensticks,
    price: 5000,
    inStock: 6,
    ratings: 4.5,
    category: ["Protein", "Meat", "Lunch"],
    description:
      "5 chicken thighs with some chips and tomato sauce (preferably)"
  },
  {
    id: 7,
    title: "Chinese",
    image: chinese,
    price: 2500,
    inStock: 6,
    ratings: 3.5,
    category: ["vegan", "wheat", "breakfast"],
    description: "Inspired Chinese dish"
  },
  {
    id: 8,
    title: "Chicken chips",
    image: chipskuku,
    price: 3500,
    inStock: 6,
    ratings: 4.5,
    category: ["Protein", "Meat", "Lunch", "fast"],
    description: "Chips with quarter chicken and some tomato paste and salad"
  },
  {
    id: 9,
    title: "meat with chips",
    image: chipsnyama,
    price: 2500,
    inStock: 6,
    ratings: 4.5,
    category: ["Protein", "Meat", "Lunch", "fast"],
    description: "French fries with a quarter kilo meat"
  },
  {
    id: 10,
    title: "deserts",
    image: desserts,
    price: 2000,
    inStock: 6,
    ratings: 4.0,
    category: ["desserts", "vegan", "breakfast"],
    description: "English type desserts"
  },
  {
    id: 11,
    title: "Mixed meals",
    image: mixer,
    price: 5000,
    inStock: 6,
    ratings: 4.5,
    category: ["Protein", "wheat", "Lunch", "fast"],
    description: "Chips, rice, burger and some veggies. It's literally a mixer"
  },
  {
    id: 12,
    title: "Fried Bananas",
    image: ndizi,
    price: 6000,
    inStock: 6,
    ratings: 4.5,
    category: ["snacks", "breakfast", "Lunch", "fast"],
    description: "Fried bananas with sausage, a burger and a mango juice"
  },
  {
    id: 13,
    title: "Vegan breakfast",
    image: veganbreakfast,
    price: 3000,
    inStock: 6,
    ratings: 4.5,
    category: ["vegan", "breakfast", "fast"],
    description: "Chapati with a vegan potato roast"
  },
  {
    id: 14,
    title: "Chips with eggs and smoked meat",
    image: zegemishkaki,
    price: 4000,
    inStock: 6,
    ratings: 4.5,
    category: ["Protein", "Meat", "Lunch", "Eggs", "fast"],
    description: "Chips with eggs and smoked meat"
  },
  {
    id: 15,
    title: "Shawarma",
    image: shawarma,
    price: 4000,
    inStock: 6,
    ratings: 5.0,
    category: ["Protein", "Meat", "Lunch", "fast"],
    description: "Shawarma with some fries"
  },
  {
    id: 16,
    title: "Chips with eggs",
    image: chipszege,
    price: 3000,
    inStock: 6,
    ratings: 5.0,
    category: ["Protein", "Meat", "Lunch", "eggs", "fast"],
    description: "Chips with eggs and some tomato sauce"
  },
  {
    id: 17,
    title: "Tanzanian breakfast",
    image: tanzaniansnacks,
    price: 2000,
    inStock: 6,
    ratings: 4.5,
    category: ["Protein", "Meat", "breakfast", "fast", "snacks"],
    description:
      "Everyday's breakfast in the heart of Tanzania, mixed with some fried cassavas and more."
  },
  {
    id: 18,
    title: "Fruit Salad",
    image: salad,
    price: 2000,
    inStock: 6,
    ratings: 4.0,
    category: ["vegan", "breakfast", "desserts"],
    description: "Mixed fruits salad for low prices to maintain your diet"
  }
];
