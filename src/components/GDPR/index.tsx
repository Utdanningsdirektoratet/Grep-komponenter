import * as React from 'react';
import { Info } from '@mui/icons-material';
import { useStyles } from './styles';
import { Box, Typography } from '@mui/material';

const GDPR: React.FC = (props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Info className={classes.icon} />
      <Box className={classes.content}>
        <Typography className={classes.title}>
          Personlig informasjon og personvern
        </Typography>
        <Typography className={classes.body}>{props.children}</Typography>
      </Box>
    </Box>
  );
};

export default GDPR as React.ComponentType;
