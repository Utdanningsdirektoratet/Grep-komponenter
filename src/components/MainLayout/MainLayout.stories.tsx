import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MainLayout } from '..';

storiesOf('MainLayout', module).add('MainLayout with content', () => (
  <MainLayout>
    <div style={{ height: 500, width: 1500, backgroundColor: 'grey' }} />
  </MainLayout>
));
