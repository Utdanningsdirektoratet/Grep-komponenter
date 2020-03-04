import * as React from 'react';
import Sidebar from './Sidebar';
import { storiesOf } from '@storybook/react';
import { NavigationProps } from '../AppBarNavList';

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
  },
  {
    id: 3,
    label: "Oversettelser",
    children: [
      {
        id: 4,
        label: "Child 1-1"
      },
      {
        id: 5,
        label: "Child 1-2",
        children: [
          {
            id: 6,
            label: "Child 2-1"
          },
          {
            id: 7,
            label: "Child 2-2",
            children: [
              {
                id: 8,
                label: "Child 3-1",
              },
              {
                id: 9,
                label: "Child 3-2"
              }
            ]
          }
        ]
      }
    ]
  },
];

storiesOf('Sidebar', module).add('standard', () => (
  <Sidebar
    pages={adminPages}
    currentPageId={1}
    onPageClick={page => console.log('clicked on ', page.label)}
  />
));
