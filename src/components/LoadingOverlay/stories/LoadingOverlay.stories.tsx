import React from 'react';
import LoadingOverlay from '..';
import { Button } from '@mui/material';

export default {
  title: 'LoadingOverlay',
};

export const Standard = {
  render: () => {
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
  },

  name: 'standard',
};

export const CustomOverlay = {
  render: () => {
    const [show, setShow] = React.useState(false);

    return (
      <LoadingOverlay overlay="rgb(255, 0, 0)" show={show}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShow(!show)}
        >{`Turn ${show ? 'off' : 'on'}`}</Button>
      </LoadingOverlay>
    );
  },
};
