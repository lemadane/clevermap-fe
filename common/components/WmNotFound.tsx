import { Typography } from '@mui/material';
import Link from 'next/dist/client/link';
import { Column } from './WmLayoutModes';

type Props = {
  findWhat: string;
  goBackHref: string;
  goBackName: string;
};

export default function WmNotFound(props: Props) {
  return (
    <main>
      <Column>
        <Typography>Not Found</Typography>
        <p>{`We could not find the ${props.findWhat} you were looking for`}</p>
        <p>
          Go back to <Link href={props.goBackHref}>{props.goBackName}</Link>.
        </p>
      </Column>
    </main>
  );
}
