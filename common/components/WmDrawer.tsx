'use client';
import React from 'react';
import useWmDrawerState from '@/common/store/WmDrawerState';
import Image from 'next/image';
import { Button, SwipeableDrawer, Typography, Divider } from '@mui/material';
import WmLink from './WmLink';
import { Column, Row } from './WmLayoutModes';

export default function WmDrawer() {
  const drawer = useWmDrawerState((state) => state);
  return (
    <SwipeableDrawer
      sx={{
        width: drawer.width,
        height: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawer.width,
          boxSizing: 'border-box',
        },
      }}
      anchor='left'
      open={drawer.opened}
      onClose={drawer.toggle}
      onOpen={drawer.toggle}
      onDoubleClick={drawer.toggle}
    >
      <Row
        spacing={1}
        padding='30px'
        alignItems='center'
        justifyContent='center'
      >
        <Image
          width={34}
          height={34}
          src='/mapwise_logo.png'
          alt=''
        />
        <Typography
          variant='h6'
          fontSize='24px'
          fontWeight='5 00'
          color='#1C1C1C'
        >
          WiseMap
        </Typography>
      </Row>
      <Column
        alignItems='center'
        paddingLeft='10px'
        height='100%'
      >
        <Typography
          variant='button'
          fontSize='12px'
          fontWeight='400'
          color='#969696'
          alignSelf='flex-start'
          margin='5px 20px'
        >
          Main Menu
        </Typography>
        <Column
          alignItems='center'
          justifyContent='space-between'
          height='100%'
        >
          <Column>
            <WmLink
              text='Dashboard'
              href='/dashboard'
              imageIcon='/dashboard_sidebar_icon.svg'
            />
            <WmLink
              text='People'
              href='/people'
              imageIcon='/people_sidebar_icon.svg'
            />
            <WmLink
              text='Programs'
              href='/programs'
              imageIcon='/programs_sidebar_icon.svg'
            />
          </Column>
          <Column paddingBottom='70px'>
            <Divider />
            <WmLink
              text='Maintenance'
              href='/maintenance'
              imageIcon='/maintenance_sidebar_icon.svg'
            />
          </Column>
        </Column>
        <Button
          variant='outlined'
          sx={{ margin: '20px' }}
          onClick={drawer.toggle}
        >
          Close
        </Button>
      </Column>
    </SwipeableDrawer>
  );
}

// 'use client';
// import Drawer from '@mui/material/Drawer/Drawer';
// import useWmDrawerState from '../store/WmDrawerState';

// export default function WmDrawer() {
//   const { opened, toggle } = useWmDrawerState((state) => state);

//   return (
//     <Drawer
//       anchor='left'
//       open={opened}
//       onClose={() => toggle()}
//     >
//       <div>Drawer</div>
//     </Drawer>
//   );
// }
