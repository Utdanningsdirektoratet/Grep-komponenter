import * as React from 'react';
import { Box, Typography } from '@mui/material';

import { useStyles } from './styles';
import GrepTable, { GrepTableProps } from '../GrepTable';

interface GrepTableCardProps<T> extends GrepTableProps<T> {
  title: string;
}

const GrepTableCard = <T,>(props: GrepTableCardProps<T>) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container} style={props.style}>
      <Typography className={classes.title}>{props.title}</Typography>
      <GrepTable<T> {...props} header />
    </Box>
  );
};

export default GrepTableCard;
