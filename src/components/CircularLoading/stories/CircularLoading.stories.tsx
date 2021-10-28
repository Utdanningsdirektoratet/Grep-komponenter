import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CircularLoading from '..';

storiesOf('CircularLoading', module)
  .add('standard', () => <CircularLoading />)
  .add('custom height', () => <CircularLoading height={200} />);
