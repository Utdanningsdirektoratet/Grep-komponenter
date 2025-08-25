import React from 'react';
import Scaffold from './_scaffold';
import Standard from './standard';

export default {
  title: 'Table of contents',
};

export const Default = {
  render: () => {
    return (
      <Scaffold>
        <Standard />
      </Scaffold>
    );
  },

  name: 'standard',
};
