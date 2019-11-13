import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CircularLoading from './CircularLoading';

storiesOf('CircularLoading', module)
  .add('standard', () => <CircularLoading />)
  .add('custom height', () => <CircularLoading height={200} />);
