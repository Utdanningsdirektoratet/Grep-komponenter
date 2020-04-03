import React from 'react';
import { storiesOf } from '@storybook/react';
import { ConfirmationServiceProvider, useConfirmation } from '..';
import { Button } from '@material-ui/core';

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

storiesOf('ConfirmDialog', module)
  .addDecorator(storyFn => (
    <ConfirmationServiceProvider>{storyFn()}</ConfirmationServiceProvider>
  ))
  .add('standard', () => <Component />)
  .add('warning', () => <Component warning />);
