import * as React from 'react';
import CircularLoading from '..';

export default {
  title: 'CircularLoading',
};

export const Standard = {
  render: () => <CircularLoading />,
  name: 'standard',
};

export const CustomHeight = {
  render: () => <CircularLoading height={200} />,
  name: 'custom height',
};
