import * as React from 'react';
import ContainedLinkList from '..';
import Inbox from '@mui/icons-material/Inbox';
import Settings from '@mui/icons-material/Settings';
import Description from '@mui/icons-material/Description';
import { NavigationProps } from '../../AppBarNavList';

export const myPages: NavigationProps[] = [
  {
    id: 1,
    label: 'Læreplaner',
    toUrl: '/curriculums',
    linkIcon: <Inbox color="primary" />,
  },
  {
    id: 2,
    label: 'Metadata',
    toUrl: '/meta',
    linkIcon: <Description color="primary" />,
  },
  {
    id: 3,
    label: 'Systemadministrasjon',
    toUrl: '/admin',
    linkIcon: <Settings color="primary" />,
  },
];

export default {
  title: 'ContainedLinkList',
  excludeStories: ['myPages'],
};

export const Standard = {
  render: () => (
    <ContainedLinkList
      title={'Mine tilganger'}
      pages={myPages}
      onPageClick={(page) => console.log('clicked on ', page.label)}
    />
  ),

  name: 'standard',
};
