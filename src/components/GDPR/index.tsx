import React from 'react';
import Info from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classes from './styles/gdpr.module.css';

const GDPR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box className={classes.container}>
      <Info className={classes.icon} />
      <Box className={classes.content}>
        <Typography className={classes.title}>
          Personlig informasjon og personvern
        </Typography>
        <Box className={classes.body}>{children}</Box>
      </Box>
    </Box>
  );
};

export default GDPR;
