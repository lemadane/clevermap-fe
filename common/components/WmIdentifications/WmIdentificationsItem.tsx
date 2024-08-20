import { Box, Card, Typography } from '@mui/material';

type WmAdditionalDetailsItemProps = {
  children: React.ReactNode;
};

export default function WmIdentificationsItem(
  props: WmAdditionalDetailsItemProps
) {
  return (
    <Card
      sx={{
        marginY: '20px',
        marginX: '10px',
        padding: '30px',
        width: 'auto',
        height: '150px',
        borderRadius: '12px',
        border: '1px solid #b7b7b7',
        boxShadow: '2px 4px 5.3px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      {props.children}
    </Card>
  );
}
