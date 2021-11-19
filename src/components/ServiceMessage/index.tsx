import * as React from 'react';
import useStyles from './styles';
import Close from '@material-ui/icons/Close';
import Warning from '@material-ui/icons/Warning';
import { Box, Typography, IconButton } from '@material-ui/core';

type Props = {
  id: number;
  message: string;
  isPublic?: boolean;
  onDismiss?: (id: number) => void;
};

const ServiceMessage = ({ id, message, isPublic, onDismiss }: Props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.message}>
      <Typography className={classes.messageType}>
        <Warning className={classes.warning} />
        Driftsmelding
      </Typography>
      <Typography className={classes.messageText}>{message}</Typography>
      {!isPublic && onDismiss && (
        <IconButton className={classes.button} onClick={() => onDismiss(id)}>
          <Close className={classes.close} />
        </IconButton>
      )}
    </Box>
  );
};

export default ServiceMessage;
