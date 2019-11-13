import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ContainedLinkList from './ContainedLinkList';
import Inbox from '@material-ui/icons/Inbox';
import Settings from '@material-ui/icons/Settings';
import Description from '@material-ui/icons/Description';
import { NavigationProps } from '../AppBarNavList';

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

storiesOf('ContainedLinkList', module).add('standard', () => (
  <ContainedLinkList
    title={'Mine tilganger'}
    pages={myPages}
    onPageClick={page => console.log('clicked on ', page.label)}
  />
));
