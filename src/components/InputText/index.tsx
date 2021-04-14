import React from 'react';
import {
  TextField,
  TextFieldProps,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

type InputTextProps = {
  errors?: string;
  touched?: boolean;
} & TextFieldProps;
const InputText: React.FC<InputTextProps> = ({ errors, touched, ...rest }) => {
  return (
    <FormControl variant="outlined" error={touched && !!errors} fullWidth>
      <TextField
        fullWidth
        variant="outlined"
        error={touched && !!errors}
        {...rest}
      />
      {touched && errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default InputText;
