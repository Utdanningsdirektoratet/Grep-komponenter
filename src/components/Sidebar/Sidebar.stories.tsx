import * as React from 'react';
import Sidebar from './Sidebar';
import { storiesOf } from '@storybook/react';
import { NavigationProps } from '../AppBarNavList';
import { Assignment } from '@material-ui/icons';

export const adminPages: NavigationProps[] = [
  {
    id: 1,
    label: 'Informasjon om læreplan',
    toUrl: '/service-messages',
  },
  {
    id: 2,
    label: 'Kompetansemålsett',
    toUrl: '/manage-users',
    linkIcon: <Assignment />,
  },
  {
    id: 3,
    label: 'Oversettelser',
    children: [
      {
        id: 4,
        label: 'Child 1-1',
        linkIcon: <Assignment />,
      },
      {
        id: 5,
        label: 'Child 1-2',
      },
    ],
  },
];

storiesOf('Sidebar', module).add('standard', () => (
  <Sidebar
    pages={adminPages}
    currentPageId={1}
    onPageClick={(page) => console.log('clicked on ', page.label)}
  />
));
