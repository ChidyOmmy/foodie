import React from "react";

const WithContext = (Component) => {
  return () => {
    <Component />;
  };
};

export default WithContext;
