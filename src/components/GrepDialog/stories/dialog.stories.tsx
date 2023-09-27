import React from 'react';
import { GrepDialogServiceProvider, useGrepDialog } from '..';
import { Button, DialogContentText } from '@mui/material';

const Component: React.FC<{ actions?: JSX.Element[] }> = ({ actions }) => {
  const open = useGrepDialog();

  const handleClick = () => {
    open({
      title: 'Title text',
      content: <DialogContentText>Some content</DialogContentText>,
      actions,
    });
  };

  return <Button onClick={handleClick}>Open dialog</Button>;
};

export default {
  title: 'GrepDialog',

  decorators: [
    (storyFn: any) => (
      <GrepDialogServiceProvider>{storyFn()}</GrepDialogServiceProvider>
    ),
  ],
};

export const Standard = () => <Component />;

Standard.story = {
  name: 'standard',
};

export const WithCustomActions = () => (
  <Component actions={[<Button>Hei</Button>, <Button>Hade</Button>]} />
);

WithCustomActions.story = {
  name: 'with custom actions',
};
