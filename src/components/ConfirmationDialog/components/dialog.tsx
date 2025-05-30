import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import { useStyles } from '../styles';

export interface ConfirmationOptions {
  title: string;
  description: string;
  warning?: boolean;
  confirmText?: string;
  cancelText?: string;
}
interface Props extends Partial<ConfirmationOptions> {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<Props> = ({
  open,
  title,
  description,
  warning,
  onSubmit,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Avbryt',
}) => {
  const { classes } = useStyles();

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button className={warning ? classes.discard : ''} onClick={onSubmit}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
