import * as React from 'react';
import CircularLoading from '..';

export default {
  title: 'CircularLoading',
};

export const Standard = () => <CircularLoading />;

Standard.story = {
  name: 'standard',
};

export const CustomHeight = () => <CircularLoading height={200} />;

CustomHeight.story = {
  name: 'custom height',
};
