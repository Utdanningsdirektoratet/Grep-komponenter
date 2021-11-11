import * as React from 'react';
import Sidebar from '..';
import { storiesOf } from '@storybook/react';
import { NavigationProps } from '../../AppBarNavList';
import { Assignment } from '@material-ui/icons';

export const adminPages: NavigationProps[] = [
  {
    id: 1,
    label: 'Informasjon om læreplan',
    toUrl: '/service-messages',
  },
  {
    id: 6,
    label: 'Test',
    children: [
      {
        id: 7,
        label: 'Hmm',
      },
    ],
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

storiesOf('Sidebar', module).add('standard', () => {
  const [pageId, setPageId] = React.useState(4);
  return (
    <Sidebar
      pages={adminPages}
      currentPageId={pageId}
      onPageClick={(page) => setPageId(page.id)}
    />
  );
});
