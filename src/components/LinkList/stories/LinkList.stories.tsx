import * as React from 'react';
import LinkList from '..';
import { NavigationProps } from '../../AppBarNavList';

export const adminPages: NavigationProps[] = [
  {
    id: 1,
    label: 'Driftsmeldinger',
    toUrl: '/service-messages',
  },
  {
    id: 2,
    label: 'Administrer brukere',
    toUrl: '/manage-users',
  },
];

export default {
  title: 'LinkList',
  excludeStories: ['adminPages'],
};

export const Standard = () => (
  <LinkList
    pages={adminPages}
    title={'Systemadministrasjon'}
    onPageClick={(page) => console.log('clicked on ', page.label)}
  />
);

Standard.story = {
  name: 'standard',
};
