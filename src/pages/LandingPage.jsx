import React from "react";
import Hero from "../components/Hero";
import Meals from "../components/Meals";
import SpecialOffers from "../components/SpecialOffers";
import AdditionalMessage from "../components/AdditionalMessage";
const LandingPage = () => {
  return (
    <React.Fragment>
      <Hero />
      <Meals />
      <SpecialOffers />
      <AdditionalMessage />
    </React.Fragment>
  );
};

export default LandingPage;
