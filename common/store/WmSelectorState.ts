import { IdAndName } from '../types';

export interface WmSelectorState {
  hasError: boolean;
  errorMessage: string;
  value: IdAndName;
  lookups: IdAndName[];
}

export const WmSelectorInitialState = {
  hasError: false,
  errorMessage: '',
  value: { id: 0, name: '' } as IdAndName,
  lookups: [] as IdAndName[],
} as WmSelectorState;
