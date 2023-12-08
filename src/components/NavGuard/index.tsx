import * as React from 'react';
import { useBlocker } from 'react-router';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useEffect } from 'react';

export interface NavGuardProperties {
  when: boolean;
  title: string;
  txt: string;
  txtSave: string;
  txtCancel: string;
  txtDiscard: string;
  onDiscard?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

const NavGuard = ({
  when,
  title,
  txt,
  txtSave,
  txtCancel,
  txtDiscard,
  onSave,
  onCancel,
  onDiscard,
}: NavGuardProperties) => {
  const [open, setOpen] = React.useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      when && currentLocation.pathname !== nextLocation.pathname,
  );

  const handleCancel = () => {
    setOpen(false);
    onCancel && onCancel();
    blocker.reset ? blocker.reset() : null;
  };

  const handleDiscard = () => {
    setOpen(false);
    onDiscard && onDiscard();
    blocker.proceed ? blocker.proceed() : null;
  };

  const handleSave = () => {
    onSave && onSave();
    setOpen(false);
    blocker.proceed ? blocker.proceed() : null;
  };

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setOpen(true);
    }
  }, [blocker]);

  return (
    <React.Fragment>
      {blocker.state === 'blocked' ? (
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {txt}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} autoFocus color="inherit">
              {txtCancel}
            </Button>
            <Button onClick={handleDiscard} color="error">
              {txtDiscard}
            </Button>
            {onSave && (
              <Button onClick={handleSave} color="primary">
                {txtSave}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      ) : null}
    </React.Fragment>
  );
};

export default NavGuard;
