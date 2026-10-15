import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import { hex2rgba } from '../../../styling/hex2rgb';

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
        <Button
          sx={(theme) =>
            warning
              ? {
                  '& .MuiError-root': { backgroundColor: 'green' },
                  color: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: hex2rgba(theme.palette.error.main, 0.1),
                  },
                }
              : {}
          }
          onClick={onSubmit}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
