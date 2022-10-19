import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AppBarNavList from '..';

export const navbarPages = [
  {
    id: 1,
    label: 'Hjem',
    onClick: (url: string) => console.log('going to url: ', url),
    toUrl: '/home',
    name: 'home',
    path: '/home',
  },
  {
    id: 2,
    label: 'Læreplaner',
    onClick: (url: string) => console.log('going to url: ', url),
    toUrl: '/curriculums',
    name: 'curriculums',
    path: '/curriculums',
  },
  {
    id: 3,
    label: 'Metadata',
    onClick: (url: string) => console.log('going to url: ', url),
    toUrl: '/metadata',
    name: 'metadata',
    path: '/metadata',
  },
  {
    id: 4,
    label: 'Administrasjon',
    onClick: (url: string) => console.log('going to url: ', url),
    toUrl: '/admin',
    name: 'admin',
    path: '/admin',
  },
];

storiesOf('AppbarNavigationList', module).add('with theme and appbar', () => (
  <AppBarNavList
    pages={navbarPages}
    selectedPage={navbarPages[0].id}
    onChange={(number) => console.log('index: ', number)}
  />
));
