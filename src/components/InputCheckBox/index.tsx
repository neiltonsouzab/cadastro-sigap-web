import React from 'react';
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  CheckboxProps,
  Grid,
} from '@material-ui/core';

type InputCheckBoxProps = {
  label: string;
  options: Array<{
    value: number;
    label: string;
  }>;
} & CheckboxProps;
const InputCheckBox: React.FC<InputCheckBoxProps> = ({
  label,
  options,
  ...rest
}) => {
  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{label}</FormLabel>

      <FormGroup>
        <Grid container spacing={2}>
          {options.map((option) => (
            <Grid item md={2} key={option.label}>
              <FormControlLabel
                label={option.label}
                control={<Checkbox value={option.value} {...rest} />}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
      <FormHelperText>You can display an error</FormHelperText>
    </FormControl>
  );
};

export default InputCheckBox;
