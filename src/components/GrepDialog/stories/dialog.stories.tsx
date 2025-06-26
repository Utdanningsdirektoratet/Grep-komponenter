import React, { JSX } from 'react';
import { GrepDialogServiceProvider, useGrepDialog } from '..';
import { Button, DialogContentText } from '@mui/material';

export const content = 'Some content';
export const openText = 'Open dialog';
export const title = 'Title text';

export const Component: React.FC<{ actions?: JSX.Element[] }> = ({
  actions,
}) => {
  const open = useGrepDialog();

  const handleClick = () => {
    open({
      title: title,
      content: <DialogContentText>{content}</DialogContentText>,
      actions,
    });
  };

  return <Button onClick={handleClick}>{openText}</Button>;
};

export default {
  title: 'GrepDialog',

  decorators: [
    (storyFn: any) => (
      <GrepDialogServiceProvider>{storyFn()}</GrepDialogServiceProvider>
    ),
  ],
  excludeStories: ['Component', 'content', 'openText', 'title'],
};

export const Standard = () => <Component />;

Standard.story = {
  name: 'standard',
};

export const WithCustomActions = () => (
  <Component
    actions={[<Button key="Hei">Hei</Button>, <Button key="Hade">Hade</Button>]}
  />
);

WithCustomActions.story = {
  name: 'with custom actions',
};
