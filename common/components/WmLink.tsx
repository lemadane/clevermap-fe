import Link from 'next/link';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';

type Props = {
  text: string;
  imageIcon?: string;
  href?: string;
  iconHeight?: number;
  iconWidth?: number;
  onClick?: () => void;
};

export default function WmLink(props: Props) {
  return (
    <Link href={props.href ? props.href : ''}>
      <Button
        sx={{ textTransform: 'none', minHeight: 0, minWidth: 0 }}
        onClick={props.onClick}
      >
        <Image
          height={props.iconHeight || 15}
          width={props.iconWidth || 15}
          src={props.imageIcon ? props.imageIcon : '/mapwise_logo.png'}
          alt=''
        />
        <Typography
          padding='10px'
          fontWeight={500}
        >
          {props.text}
        </Typography>
      </Button>
    </Link>
  );
}
