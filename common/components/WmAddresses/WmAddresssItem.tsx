'use client';
import { Card } from '@mui/material';

type WmAddressItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function WmAddressItem(props: WmAddressItemProps) {
  return (
    <Card
      onClick={props.onClick}
      sx={{
        marginY: '20px',
        marginX: '10px',
        padding: '30px',
        width: 'auto',
        height: '200px',
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
