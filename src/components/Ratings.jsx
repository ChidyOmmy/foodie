import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const defaultLabels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "cool",
  3: "okay",
  3.5: "Good",
  4: "yummy!",
  4.5: "Excellent",
  5: "Satisfied"
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${defaultLabels[value]}`;
}

export default function Ratings({ meal }) {
  const [value, setValue] = React.useState(meal.ratings);
  const [hover, setHover] = React.useState(-1);
  const [labels, changeLabels] = React.useState(defaultLabels);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center"
      }}>
      <Rating
        size='small'
        name='hover-feedback'
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon fontSize='inherit' />}
      />
      {value !== null && (
        <Box sx={{ color: "#fff", ml: 2 }}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
}
