export interface WmTextFieldState {
  value: string;
  hasError: boolean;
 errorMessage: string;
}

export const WmTextFieldInitialState = {
  value: '',
  hasError: false,
  errorMessage: '',
} as WmTextFieldState