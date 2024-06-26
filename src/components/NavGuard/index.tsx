import * as React from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import { Location } from 'history';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [leave, setLeave] = React.useState(false);
  const [lastLocation, setLastLocation] = React.useState<Location>();
  const history = useHistory();


  const handleCancel = () => {
    setLeave(false);
    setOpen(false);
    onCancel && onCancel();
  };

  const handleDiscard = () => {
    setLeave(true);
    setOpen(false);
    onDiscard && onDiscard();
    lastLocation &&
      window.requestAnimationFrame(() =>history.push(lastLocation));
  };

  const handleSave = () => {
    onSave && onSave();
    setLeave(true);
    setOpen(false);
    lastLocation &&
      window.requestAnimationFrame(() => history.push(lastLocation));
  };

  const handleLeave = (location: Location) => {
    setLastLocation(location);
    setOpen(!leave);
    return !!leave;
  };

  return (
    <React.Fragment>
      <Prompt when={when} message={handleLeave} />
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
    </React.Fragment>
  );
};

export default NavGuard;