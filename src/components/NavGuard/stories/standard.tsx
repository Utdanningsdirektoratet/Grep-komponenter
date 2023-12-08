import React from 'react';

import { useNavigate } from 'react-router';

import { Button, Box } from '@mui/material';
import NavGuard from '..';

// eslint-disable-next-line react/display-name
export default () => {
  const navigate = useNavigate();
  const props = {
    when: true,
    title: 'Confirm navigation',
    txt: 'You have created or unstored data, leaving this page will discard all changes!',
    txtDiscard: 'Discard',
    txtCancel: 'Cancel',
    txtSave: 'Save',
  };
  return (
    <Box>
      <NavGuard {...props} onSave={() => null} />
      <Button onClick={() => navigate('elsewhere')}>Test me</Button>
    </Box>
  );
};
