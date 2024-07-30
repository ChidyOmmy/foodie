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
import ndizi from "./images/ndizi.jpg";
import salad from "./images/salad.jpg";
import shawarma from "./images/shawarma.jpg";
import tanzaniansnacks from "./images/tanzaniansnacks.jpg";
import zegemishkaki from "./images/zegemishkaki.jpg";
import desserts from "./images/desserts.jpg";
import veganbreakfast from "./images/veganbreakfast.jpg";

export const user = {
  cart: {
    "Pilau Biryani": {
      price: 5000,
      purchased: 2,
      total: function () {
        return this.price * this.purchased;
      }
    }
  },
  searchResults: []
};

export const menu = [
  {
    title: "Pilau Biryani",
    image: meal,
    price: 5000,
    inStock: 0,
    ratings: 4.5,
    description: "biryani with a quarter kilo of meat"
  },
  {
    title: "Pilau with meat",
    image: pilau,
    price: 3000,
    inStock: 0,
    ratings: 4.5,
    description: "You get a plate of pilau with a quarter kilo of fried meat"
  },
  {
    title: "Samosas",
    image: breakfast,
    price: 2000,
    inStock: 6,
    ratings: 3.5,
    description: "Fried meat samosas with roasted meat"
  },
  {
    title: "British breakfast",
    image: britishbreakfast,
    price: 4000,
    inStock: 6,
    ratings: 5.0,
    description: "Eggs, sausage with fried beans and a slice of avocado"
  },
  {
    title: "Chapati with Liver",
    image: chapatimaini,
    price: 3000,
    inStock: 6,
    ratings: 4.0,
    description:
      "Chapati with roasted liver, a bit of rice and a slice of avocado"
  },
  {
    title: "Chicken sticks",
    image: chickensticks,
    price: 5000,
    inStock: 6,
    ratings: 4.5,
    description:
      "5 chicken thighs with some chips and tomato sauce (preferebly)"
  },
  {
    title: "Chinese",
    image: chinese,
    price: 2500,
    inStock: 6,
    ratings: 3.5,
    description: "inspired chinese dish"
  },
  {
    title: "Chicken chips",
    image: chipskuku,
    price: 3500,
    inStock: 6,
    ratings: 4.5,
    description: "Chips with quarter chicken and some tomato past and salad"
  },
  {
    title: "meat with chips",
    image: chipsnyama,
    price: 2500,
    inStock: 6,
    ratings: 4.5,
    description: "french fries with a quarter kilo meat"
  },
  {
    title: "deserts",
    image: desserts,
    price: 2000,
    inStock: 6,
    ratings: 4.0,
    description: "English type desserts"
  },
  {
    title: "Mixed meals",
    image: mixer,
    price: 5000,
    inStock: 6,
    ratings: 4.5,
    description: "Chips,rice,burger and some veggies. It's literally a mixer"
  },
  {
    title: "Fried Bananas",
    image: ndizi,
    price: 6000,
    inStock: 6,
    ratings: 4.5,
    description: "Fried banans with sausage a burger and a mang juice"
  },
  {
    title: "Vegan breakfast",
    image: veganbreakfast,
    price: 3000,
    inStock: 6,
    ratings: 4.5,
    description: "Chapati with a vegan potato roast"
  },
  {
    title: "Chips with eggs and smoked meat",
    image: zegemishkaki,
    price: 4000,
    inStock: 6,
    ratings: 4.5,
    description: "biryani with a quarter kilo of meat"
  },
  {
    title: "Shawarma",
    image: shawarma,
    price: 4000,
    inStock: 6,
    ratings: 5.0,
    description: "Shawarma with some fries"
  },
  {
    title: "Chips with eggs",
    image: chipszege,
    price: 3000,
    inStock: 6,
    ratings: 5.0,
    description: "Chips with eggs and some tomato sauce"
  },
  {
    title: "Tanzanian breakfast",
    image: tanzaniansnacks,
    price: 2000,
    inStock: 6,
    ratings: 4.5,
    description:
      "Everyday's breakfast in the heart of Tanzania, mixed with some fried cassavas and more."
  },
  {
    title: "Fruit Salad",
    image: salad,
    price: 2000,
    inStock: 6,
    ratings: 4.0,
    description: "Mixed fruits salad for lo prices to maintain your diet"
  }
];
