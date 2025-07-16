import * as React from 'react';
import { MainLayout } from '../..';

export default {
  title: 'MainLayout',
};

export const MainLayoutWithContent = {
  render: () => (
    <MainLayout>
      <div style={{ height: 500, width: 1500, backgroundColor: 'grey' }} />
    </MainLayout>
  ),

  name: 'MainLayout with content',
};
