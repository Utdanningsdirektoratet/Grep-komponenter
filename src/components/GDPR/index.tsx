import React from 'react';
import Info from '@mui/icons-material/Info';
import { useStyles } from './styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const GDPR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Info className={classes.icon} />
      <Box className={classes.content}>
        <Typography className={classes.title}>
          Personlig informasjon og personvern
        </Typography>
        <Typography className={classes.body}>{children}</Typography>
      </Box>
    </Box>
  );
};

export default GDPR;
