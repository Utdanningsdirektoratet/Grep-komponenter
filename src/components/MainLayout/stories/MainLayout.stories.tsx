import * as React from 'react';
import { MainLayout } from '../..';

export default {
  title: 'MainLayout',
};

export const MainLayoutWithContent = () => (
  <MainLayout>
    <div style={{ height: 500, width: 1500, backgroundColor: 'grey' }} />
  </MainLayout>
);

MainLayoutWithContent.story = {
  name: 'MainLayout with content',
};
