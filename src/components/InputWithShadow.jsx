import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover fieldset': {
      borderColor: '#40a9ff',
    },
    '&.Mui-focused': {
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
    },
    '& fieldset': {
      borderColor: '#ccc',
    },
  },
});

const InputWithShadow = ({ placeholder }) => {
  return (
    <CustomTextField
      variant="outlined"
      fullWidth
      placeholder={placeholder || "Enter text here"}
    />
  );
};

export default InputWithShadow;
