import React from 'react';
import { useDispatch } from 'react-redux';

import { push } from 'connected-react-router';

import { Button, Box } from '@mui/material';
import NavGuard from '..';

// eslint-disable-next-line react/display-name
export default () => {
  const dispatch = useDispatch();
  const props = {
    when: true,
    title: 'Confirm navigation',
    txt:
      'You have created or unstored data, leaving this page will discard all changes!',
    txtDiscard: 'Discard',
    txtCancel: 'Cancel',
    txtSave: 'Save',
  };
  return (
    <Box>
      <NavGuard {...props} onSave={() => null} />
      <Button onClick={() => dispatch(push(''))}>Test me</Button>
      {/* <Button onClick={() => location.href = "https://google.com"}>Test me</Button> */}
    </Box>
  );
};
