import React from 'react';
import LoadingOverlay, { LoadingOverlayProps } from '..';
import { Button } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react-vite';

const TestLoadingOverlay = (args: Omit<LoadingOverlayProps, 'show'>) => {
  const [show, setShow] = React.useState(false);

  return (
    <LoadingOverlay show={show} {...args}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShow(!show)}
      >{`Turn ${show ? 'off' : 'on'}`}</Button>
    </LoadingOverlay>
  );
};

const meta = {
  title: 'LoadingOverlay',
  args: { zIndex: 1 },
  render: ({ ...args }) => <TestLoadingOverlay {...args} />,
} satisfies Meta<typeof TestLoadingOverlay>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  name: 'standard',
};

export const CustomOverlay = {
  args: { overlay: 'rgb(255, 0, 0)' },
};
