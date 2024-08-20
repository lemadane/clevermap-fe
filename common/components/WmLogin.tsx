'use client';
import { Column } from './WmLayoutModes';
import useToastState from '@/common/store/WmToastState';
import useLoginState from '@/common/store/LoginState';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import {
  Button,
  Card,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { login } from '../api/auth';
import { getSystemUser } from '../api/systemUsers';
import { getUserGroupPermissions } from '../api/usergroupsPermissions';

export default function WmLogin() {
  const [passwordShown, showPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const toastState = useToastState(
    (state) => state
  );
  const loginState = useLoginState((state) => state);
  const router = useRouter();

  useEffect(() => {
    loginState.logout();
  }, []);

  return (
    <Card
      sx={{
        width: {
          md: '400px',
          xs: '300px',
        },
        height: 'auto',
        borderRadius: '10px',
        backgroundColor: 'white',
      }}
      style={{
        borderRadius: '20px',
      }}
    >
      <Column
        justifyContent='center'
        alignItems='center'
      >
        <Image
          width={250}
          height={200}
          src='/wisemap_logo.png'
          alt='wisemap_logo'
          style={{
            marginTop: '10px',
            marginBottom: '50px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <Column
          sx={{
            width: {
              md: '304px',
              xs: '240px',
            },
            marginBottom: '50px',
          }}
        >
          <FormControl
            variant='standard'
            sx={{
              height: 'auto',
              width: 'inherit',
              marginBottom: '20px',
            }}
            error={usernameError}
          >
            <InputLabel
              htmlFor='username-input'
              error={usernameError}
            >
              USERNAME
            </InputLabel>
            <Input
              id='username-input'
              type='text'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton>
                    <PersonOutlineOutlined />
                  </IconButton>
                </InputAdornment>
              }
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (String(username).trim() === '') {
                  setUsernameError(true);
                  return;
                }
                setUsernameError(false);
              }}
              onBlur={() => {
                if (String(username).trim() === '') {
                  setUsernameError(true);
                  return;
                }
                setUsernameError(false);
              }}
              error={usernameError}
            />
          </FormControl>
          <FormControl
            variant='standard'
            sx={{
              height: 'auto',
              width: 'inherit',
              marginBottom: '40px',
            }}
            error={passwordError}
          >
            <InputLabel
              htmlFor='password-input'
              error={passwordError}
            >
              PASSWORD
            </InputLabel>
            <Input
              id='password-input'
              type={passwordShown ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={() => showPassword(!passwordShown)}>
                    {passwordShown ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (String(password).trim() === '') {
                  setPasswordError(true);
                  return;
                }
                setPasswordError(false);
              }}
              onBlur={() => {
                if (String(password).trim() === '') {
                  setPasswordError(true);
                  return;
                }
                setPasswordError(false);
              }}
              error={passwordError}
            />
          </FormControl>
          <Button
            variant='contained'
            sx={{
              width: 'inherit',
              height: 'auto',
              paddingY: '10px',
              borderRadius: '1px',
            }}
            onClick={() => {
              // if (String(username).trim() === '') {
              //   setUsernameError(true);
              //   return;
              // }
              // setUsernameError(false);
              // if (String(password).trim() === '') {
              //   setPasswordError(true);
              //   return;
              // }
              // setPasswordError(false);
              (async () => {
                try {
                  setUsername('jlreyes1');
                  setPassword('Admin123?');
                  const loginInfo = await login(username, password);
                  const systemUser = await getSystemUser(loginInfo.userId);
                  const permissions = await getUserGroupPermissions(
                    systemUser.groupId,
                    1,
                    100,
                    true
                  );
                  loginState.setUser({
                    ...loginInfo,
                    ...systemUser,
                    permissions: permissions.map(
                      (permission: any) => permission.name
                    ),
                  });
                  router.push('/dashboard');
                } catch (err: any) {
                  toastState.setState({
                    ...toastState,
                    message: err.message,
                    severity: 'error',
                    visibility: true,
                  });
                }
              })();
            }}
            disabled={false} //{usernameError || passwordError}
          >
            Login
          </Button>
        </Column>
      </Column>
    </Card>
  );
}
