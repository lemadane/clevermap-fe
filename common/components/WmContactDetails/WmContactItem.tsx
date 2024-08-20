'use client';
import { Card } from '@mui/material';

type WmContactDetailsItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function WmContactItem(
  props: WmContactDetailsItemProps
) {
  return (
    <Card
      onClick={props.onClick}
      sx={{
        marginY: '20px',
        marginX: '10px',
        padding: '30px',
        width: 'auto',
        height: '150px',
        borderRadius: '12px',
        border: '1px solid #b7b7b7',
        boxShadow: '2px 4px 5.3px 0px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
      }}
    >
      {props.children}
    </Card>
  );
}
