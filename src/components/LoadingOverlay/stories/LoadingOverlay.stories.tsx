import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingOverlay from '..';
import { Button } from '@material-ui/core';

storiesOf('LoadingOverlay', module).add('standard', () => {
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
});
