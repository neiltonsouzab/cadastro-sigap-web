import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
  Chip,
  Checkbox,
  ListItemText,
} from '@material-ui/core';

// import { Container } from './styles';

type InputSelectMultipleProps = {
  label: string;
  options: Array<{
    value: number | string;
    label: string;
  }>;
} & SelectProps;

const InputSelectMultiple: React.FC<InputSelectMultipleProps> = ({
  label,
  options,
  ...rest
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select fullWidth multiple variant="outlined" label={label} {...rest}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox
              checked={(rest.value as number[]).includes(Number(option.value))}
            />
            <ListItemText primary={option.label} />.
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputSelectMultiple;
