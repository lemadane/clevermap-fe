'use client';
import React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import { Grid, GridProps } from '@mui/material';

export const Row = (props: StackProps) => {
  return (
    <Stack
      direction='row'
      {...props}
    >
      {props.children}
    </Stack>
  );
};

export const Column = (props: StackProps) => {
  return (
    <Stack
      direction='column'
      {...props}
    >
      {props.children}
    </Stack>
  );
};

export const GridContainer = (props: GridProps) => {
  return (
    <Grid
      container
      {...props}
    >
      {props.children}
    </Grid>
  );
};

export const GridItem = (props: GridProps) => {
  return (
    <Grid
      item
      {...props}
    >
      {props.children}
    </Grid>
  );
};
