import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('GrepDialog', module)
  .addDecorator((storyFn) => (
    <GrepDialogServiceProvider>{storyFn()}</GrepDialogServiceProvider>
  ))
  .add('standard', () => <Component />)
  .add('with custom actions', () => (
    <Component actions={[<Button>Hei</Button>, <Button>Hade</Button>]} />
  ));
