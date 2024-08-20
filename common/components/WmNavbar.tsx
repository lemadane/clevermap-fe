'use client';
import Image from 'next/image';
import { Button, Typography, Breadcrumbs } from '@mui/material';
import useWmDrawerState from '@/common/store/WmDrawerState';
import { useTheme } from '@mui/material/styles';
import useLoginState from '../store/LoginState';
import { useEffect } from 'react';
import { Row } from './WmLayoutModes';

export const NAVBAR_HEIGHT = 80;

export const WmNavbar = () => {
  const { loggedIn, user, restoreUser } = useLoginState((state) => state);
  const sideDrawer = useWmDrawerState((state) => state);
  const theme = useTheme();

  useEffect(() => {
    restoreUser();
  }, []);
  return (
    <Row
      justifyContent='space-between'
      alignItems='center'
      //height={`${NAVBAR_HEIGHT}px`}
      width='100%'
      padding='20px'
      sx={{
        ...(loggedIn ? { display: 'flex' } : { display: 'none' }),
      }}
    >
      <Breadcrumbs
        separator={
          <Image
            src='/vector_appbar.svg'
            alt='vector'
            width={10}
            height={14}
          />
        }
      >
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#1E0202',
            height: 30,
            width: 30,
            borderRadius: '1.6px',
            padding: '8px',
            minWidth: 0,
          }}
          onClick={(e: any) => {
            e.preventDefault();
            sideDrawer.toggle();
          }}
        >
          <Typography
            color='white'
            fontSize={14}
            fontWeight={600}
          >
            M
          </Typography>
        </Button>
        <Typography
          fontSize={16}
          fontWeight={600}
          sx={{
            paddingX: '8px',
            paddingY: '8px',
          }}
        >
          Dashboard
        </Typography>
      </Breadcrumbs>

      <Typography
        fontSize={14}
        fontWeight={600}
      >
        {user?.username}
      </Typography>
    </Row>
  );
};

//{
/* <Row
        alignItems='center'
        spacing={2}
      >
        <Link href='/'>
          <Button>
            <Typography
              color='black'
              variant='button'
            >
              Home
            </Typography>
          </Button>
        </Link>
        <Link href='/maintenance'>
          <Button color='inherit'>
            <Typography
              color='black'
              variant='button'
            >
              Maintenance
            </Typography>
          </Button>
        </Link>
        <Link href='/login'>
          <Button
            variant='contained'
            sx={{
              height: 'auto',
              paddingY: '10px',
            }}
          >
            <Typography
              color='white'
              variant='button'
            >
              Login
            </Typography>
          </Button>
        </Link>
      </Row> */
//}
