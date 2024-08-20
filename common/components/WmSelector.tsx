import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { WmSelectorState } from '../store/WmSelectorState';
import { ReactNode } from 'react';

type WmSelectorProps = Readonly<{
  label: string;
  selectorState: WmSelectorState;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
}>;

export function WmSelector(props: WmSelectorProps) {
  const { label, selectorState } = props;

  return (
    <FormControl
      error={selectorState.hasError}
      fullWidth
    >
      <InputLabel error={selectorState.hasError}>{label}</InputLabel>
      <Select
        label={label}
        value={selectorState.value.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        error={selectorState.hasError}
      >
        {selectorState.lookups.map((item) => (
          <MenuItem
            key={item.id}
            value={item.name}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText
        error={selectorState.hasError}
        hidden={!selectorState.hasError}
      >
        {selectorState.hasError ? selectorState.errorMessage : null}
      </FormHelperText>
    </FormControl>
  );
}
