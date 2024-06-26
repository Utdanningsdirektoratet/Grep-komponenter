import React from 'react';
import { ConfirmationServiceProvider, useConfirmation } from '..';
import { Button } from '@mui/material';

const Component: React.FC<{ warning?: boolean }> = ({ warning }) => {
  const confirm = useConfirmation();

  const handleClick = () => {
    confirm({
      title: 'Title text',
      description: 'Description text',
      warning,
    }).then(() => {
      console.log('confirmed');
    });
  };

  return <Button onClick={handleClick}>Open dialog</Button>;
};

export default {
  title: 'ConfirmDialog',

  decorators: [
    (storyFn: any) => (
      <ConfirmationServiceProvider>{storyFn()}</ConfirmationServiceProvider>
    ),
  ],
};

export const Standard = () => <Component />;

Standard.story = {
  name: 'standard',
};

export const Warning = () => <Component warning />;

Warning.story = {
  name: 'warning',
};
