import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Prompt } from 'react-router-dom';
import { push } from 'connected-react-router';

import { Location } from 'history';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

export interface NavGuardProperties {
    when: boolean;
    title: string;
    txt: string;
    txtCancel: string;
    txtConfirm: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export default ({
    when,
    title,
    txt,
    txtCancel,
    txtConfirm,
    onCancel,
    onConfirm
}: NavGuardProperties) => {
    const [open, setOpen] = React.useState(false);
    const [leave, setLeave] = React.useState(false);
    const [lastLocation, setLastLocation] = React.useState<Location>();

    const dispatch = useDispatch();

    const handleCancel = () => {
        setLeave(false);
        setOpen(false);
        onCancel && onCancel();
    };

    const handleConfirm = () => {
        setLeave(true);
        setOpen(false);
        onConfirm && onConfirm();
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
                    <Button onClick={handleCancel} color="primary" autoFocus>
                        {txtCancel}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        color="primary"
                        variant="outlined"
                    >
                        {txtConfirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
