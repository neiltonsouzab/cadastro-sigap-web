import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@material-ui/core';

// import { Container } from './styles';

type InputSelectProps = {
  touched?: boolean;
  errors?: string;
  options: Array<{
    value: number | string;
    label: string;
  }>;
} & SelectProps;

const InputSelect: React.FC<InputSelectProps> = ({
  touched,
  errors,
  label,
  required,
  options,
  ...rest
}) => {
  return (
    <FormControl
      variant="outlined"
      required={required}
      fullWidth
      error={touched && !!errors}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        variant="outlined"
        fullWidth
        error={touched && !!errors}
        label={label}
        required={required}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {touched && errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default InputSelect;
