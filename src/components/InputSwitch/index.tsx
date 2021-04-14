import React from 'react';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  FormHelperText,
  SwitchProps,
} from '@material-ui/core';

type InputSwitchProps = {
  label: string;
  errors?: string;
  touched?: boolean;
} & SwitchProps;

const InputSwitch: React.FC<InputSwitchProps> = ({
  label,
  errors,
  touched,
  ...rest
}) => {
  return (
    <FormControl error={touched && !!errors} fullWidth>
      <FormGroup>
        <FormControlLabel label={label} control={<Switch {...rest} />} />
      </FormGroup>

      {touched && errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default InputSwitch;
