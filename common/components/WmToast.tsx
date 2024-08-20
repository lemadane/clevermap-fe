'use client';
import { Alert, Snackbar } from '@mui/material';
import useWmToastState from '../store/WmToastState';

export default function WmToast() {
  const state = useWmToastState((state) => state);

  const handleClose = () => {
    state.setState({ ...state, visibility: false });
  };

  return (
    <Snackbar
      open={state.visibility}
      autoHideDuration={state.duration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={state.severity}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
}
