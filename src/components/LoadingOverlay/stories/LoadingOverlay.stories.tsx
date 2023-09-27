import React from 'react';
import LoadingOverlay from '..';
import { Button } from '@mui/material';

export default {
  title: 'LoadingOverlay',
};

export const Standard = () => {
  const [show, setShow] = React.useState(false);

  return (
    <LoadingOverlay show={show}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShow(!show)}
      >{`Turn ${show ? 'off' : 'on'}`}</Button>
    </LoadingOverlay>
  );
};

Standard.story = {
  name: 'standard',
};
