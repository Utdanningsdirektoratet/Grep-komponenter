import React from 'react';
import { storiesOf } from '@storybook/react';

import Scaffold from './_scaffold';
import Standard from './standard';

storiesOf('Table of contents', module)
  // make global??
  .add('standard', () => (
    <Scaffold>
      <Standard />
    </Scaffold>
  ));
