import { TextField } from '@mui/material';
import { WmTextFieldState } from '../store/WmTextFieldState';
import { TextFieldProps } from '@mui/material';

type WmTexFieldProps = {
  label: string;
  state: WmTextFieldState;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  sx?: TextFieldProps['sx'];
};

export default function WmTextField(props: WmTexFieldProps) {
  return (
    <TextField
      label={props.label}
      value={props.state.value}
      error={props.state.hasError}
      helperText={props.state.hasError ? props.state.errorMessage : null}
      onChange={props.onChange}
      onBlur={props.onBlur}
      sx={props.sx}
    />
  );
}
