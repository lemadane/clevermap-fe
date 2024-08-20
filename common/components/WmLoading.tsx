import { Typography } from '@mui/material';
import { Row } from './WmLayoutModes';

export default function WmLoading() {
  return (
    <main>
      <Row
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h6'>Loading...</Typography>
      </Row>
    </main>
  );
}
