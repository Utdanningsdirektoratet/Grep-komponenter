import * as React from 'react';
import Close from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';
import { Box, Typography, IconButton } from '@mui/material';
import classes from './styles/serviceMessage.module.css';

type Props = {
  id: number;
  message: string;
  isPublic?: boolean;
  onDismiss?: (id: number) => void;
};

const ServiceMessage = ({ id, message, isPublic, onDismiss }: Props) => {
  return (
    <Box className={classes.message}>
      <Typography className={classes.messageType}>
        <Warning className={classes.warning} />
        Driftsmelding
      </Typography>
      <Typography className={classes.messageText}>{message}</Typography>
      {!isPublic && onDismiss && (
        <IconButton
          className={classes.button}
          onClick={() => onDismiss(id)}
          size="large"
        >
          <Close className={classes.close} />
        </IconButton>
      )}
    </Box>
  );
};

export default ServiceMessage;
