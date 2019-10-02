import React from 'react';
import { useDispatch } from 'react-redux';

import { push } from 'connected-react-router';

import { Button, Box } from '@material-ui/core';
import NavGuard from '..';

export default () => {
    const dispatch = useDispatch();
    const props = {
        when: true,
        title: 'Confirm navigation',
        txt:
            'You have created or unstored data, leaving this page will discad all changes!',
        txtConfirm: 'Discard',
        txtCancel: 'Cancel'
    };
    return (
        <Box>
            <NavGuard {...props} />
            <Button onClick={() => dispatch(push(''))}>Test me</Button>
        </Box>
    );
};
