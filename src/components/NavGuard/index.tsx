import * as React from 'react';
import { useBlocker } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface NavguardExclusion {
  current: string;
  next: string;
}
export interface NavGuardProperties {
  when: boolean;
  title: string;
  txt: string;
  txtSave: string;
  txtCancel: string;
  txtDiscard: string;
  /** Pass in an array of NavguardExclusions that the Navguard will not trigger when navigating from current to next. */
  exclude?: NavguardExclusion[];
  onDiscard?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}
const NavGuard = ({
  when,
  exclude,
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

  const handleCancel = () => {
    setOpen(false);
    onCancel && onCancel();
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

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    let excluded = false;
    exclude?.forEach((navGuardExclusion) => {
      if (
        navGuardExclusion.current.includes(currentLocation.pathname) &&
        navGuardExclusion.next.includes(nextLocation.pathname)
      ) {
        excluded = true;
      }
    });
    return (
      when && !excluded && currentLocation.pathname !== nextLocation.pathname
    );
  });

  React.useEffect(() => {
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
