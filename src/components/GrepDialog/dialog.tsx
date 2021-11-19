import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

export interface GrepDialogOptions {
  title: string;
  content: React.ReactNode;
  actions?: JSX.Element[];
  closeBtnText?: string;
}
interface Props extends GrepDialogOptions {
  open: boolean;
  onClose: VoidFunction;
}

export const GrepDialog: React.FC<Props> = ({
  open,
  title,
  content,
  onClose,
  closeBtnText = 'Lukk',
  ...props
}) => {
  const actions = [
    <Button key="OK" color="primary" onClick={onClose}>
      {closeBtnText}
    </Button>,
  ];

  if (props.actions) actions.push(...props.actions);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions.map((action) => action)}</DialogActions>
    </Dialog>
  );
};
