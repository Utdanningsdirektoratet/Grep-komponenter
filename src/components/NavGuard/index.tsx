import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { push } from 'connected-react-router';
import { Location } from 'history';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from './styles';

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

export default ({
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

  const dispatch = useDispatch();
  const classes = useStyles({});

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
      window.requestAnimationFrame(() => dispatch(push(lastLocation)));
  };

  const handleSave = () => {
    onSave && onSave();
    setLeave(true);
    setOpen(false);
    lastLocation &&
      window.requestAnimationFrame(() => dispatch(push(lastLocation)));
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
          <Button onClick={handleCancel} autoFocus>
            {txtCancel}
          </Button>
          <Button onClick={handleDiscard} className={classes.discard}>
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
