import React from 'react';
import {
  TextField,
  TextFieldProps,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import ReactInputMask from 'react-input-mask';

type InputMaskProps = {
  errors?: string;
  touched?: boolean;
  mask: string;
} & TextFieldProps;

const InputMask: React.FC<InputMaskProps> = ({
  errors,
  touched,
  mask,
  ...rest
}) => {
  return (
    <FormControl variant="outlined" fullWidth error={touched && !!errors}>
      <TextField
        fullWidth
        variant="outlined"
        error={touched && !!errors}
        InputProps={{
          inputComponent: ReactInputMask as any,
          inputProps: {
            mask,
          },
        }}
        {...rest}
      />
      {touched && errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default InputMask;
