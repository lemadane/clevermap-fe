'use client';
import { Column } from './WmLayoutModes';

type Props = {
  children: React.ReactNode;
};

export default function WmBackground({ children }: Props) {
  return (
    <Column
      justifyContent='center'
      alignItems='center'
      width='inherit'
      height='100vh'
      sx={{
        backgroundImage: `url(${'/wisemap_bg.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {children}
    </Column>
  );
}
// Compare this snippet from common/components/WmLink.tsx:
//  <div
//    style={{
//      backgroundImage: `url(${'/wisemap_bg.png'})`,
//      backgroundSize: 'cover',
//      backgroundRepeat: 'no-repeat',
//      backgroundPosition: 'center',
//      height: '100vh',
//      width: '100vw',
//      position: 'fixed',
//      top: 0,
//      left: 0,
//    }}
// />
