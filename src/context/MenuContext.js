import React, { createContext, useState, useMemo, useEffect } from "react";
import meal from "../images/meal.jpg";
import pilau from "../images/pilau.jpg";
import breakfast from "../images/breakfast.jpg";
import britishbreakfast from "../images/britishbreakfast.jpg";
import chapatimaini from "../images/chapatimaini.jpg";
import chickensticks from "../images/chickensticks.jpg";
import chinese from "../images/chinese.jpg";
import chipskuku from "../images/chipskuku.jpg";
import chipsnyama from "../images/chipsnyama.jpg";
import chipszege from "../images/chipszege.jpg";
import mixer from "../images/mixer.jpg";
import tanzaniansnacks from "../images/tanzaniansnacks.jpg";
import ndizi from "../images/ndizi.jpg";
import salad from "../images/salad.jpg";
import shawarma from "../images/shawarma.jpg";
import zegemishkaki from "../images/zegemishkaki.jpg";
import desserts from "../images/desserts.jpg";
import veganbreakfast from "../images/veganbreakfast.jpg";

// const menu = [
//   {
//     id: 1,
//     title: "Steak biryani",
//     image: meal,
//     price: 5000,
//     inStock: 0,
//     ratings: 4.5,
//     category: ["Protein", "Meat", "Lunch"],
//     description: "biryani with a quarter kilo of meat"
//   },
//   {
//     id: 2,
//     title: "Pilau with meat",
//     image: pilau,
//     price: 3000,
//     inStock: 0,
//     ratings: 4.5,
//     category: ["Protein", "Meat", "Lunch"],
//     description: "You get a plate of pilau with a quarter kilo of fried meat"
//   },
//   {
//     id: 3,
//     title: "Samosas",
//     image: breakfast,
//     price: 2000,
//     inStock: 6,
//     ratings: 3.5,
//     category: ["breakfast", "Snacks", "wheat"],
//     description: "Fried meat samosas with roasted meat"
//   },
//   {
//     id: 4,
//     title: "British breakfast",
//     image: britishbreakfast,
//     price: 4000,
//     inStock: 6,
//     ratings: 5.0,
//     category: ["Protein", "breakfast", "eggs"],
//     description: "Eggs, sausage with fried beans and a slice of avocado"
//   }
// ];
export const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  return <MenuContext.Provider value={[]}> {children} </MenuContext.Provider>;
};

export default MenuContextProvider;
