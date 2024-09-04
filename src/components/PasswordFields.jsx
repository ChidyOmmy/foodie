import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { debounce } from "@mui/material";

const PasswordFields = ({
  password,
  passwordConfirm,
  setPassword,
  setPasswordConfirm,
  passwordError,
  setPasswordError,
  showConfirmHelper,
  setShowConfirmHelper
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const toggleShowPasswordConfirm = useCallback(() => {
    setShowPasswordConfirm(
      (prevShowPasswordConfirm) => !prevShowPasswordConfirm
    );
  }, []);

  const debounceValidatePasswordConfirm = useMemo(
    () =>
      debounce((password, confirmPassword) => {
        setPasswordError(password !== confirmPassword);
      }, 300),
    [setPasswordError]
  );

  useEffect(() => {
    return () => {
      debounceValidatePasswordConfirm.clear();
    };
  }, [debounceValidatePasswordConfirm]);

  useEffect(() => {
    debounceValidatePasswordConfirm(password, passwordConfirm);
  }, [password, passwordConfirm, debounceValidatePasswordConfirm]);

  const handlePasswordChange = useCallback(
    (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
    },
    [setPassword]
  );

  const handlePasswordConfirmChange = useCallback(
    (event) => {
      const newPasswordConfirm = event.target.value;
      setPasswordConfirm(newPasswordConfirm);
      setShowConfirmHelper(true);
    },
    [setPasswordConfirm, setShowConfirmHelper]
  );

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3} mb={3}>
      <Stack direction='column' spacing={1}>
        <TextField
          id='password'
          label='Password'
          variant='outlined'
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          sx={{ width: "35ch" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={toggleShowPassword}
                  aria-label='toggle password visibility'
                  edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <FormHelperText>
          We'll create your account along with your order.
        </FormHelperText>
      </Stack>
      <Stack direction='column' spacing={1}>
        <TextField
          id='password-confirm'
          label='Confirm Password'
          variant='outlined'
          type={showPasswordConfirm ? "text" : "password"}
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          error={passwordError}
          sx={{ width: "35ch" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={toggleShowPasswordConfirm}
                  aria-label='toggle password visibility'
                  edge='end'>
                  {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {showConfirmHelper && (
          <FormHelperText
            error={passwordError}
            sx={{
              color: passwordError ? "error.main" : "success.main"
            }}>
            {passwordError
              ? "Passwords do not match. Please try again."
              : "Passwords match!"}
          </FormHelperText>
        )}
      </Stack>
    </Stack>
  );
};

export default PasswordFields;
