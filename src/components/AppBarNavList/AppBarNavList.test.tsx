import * as React from 'react';
import { render } from '@testing-library/react';

import AppBarNavList from './AppBarNavList';

const pages = [
  {
    id: 1,
    label: 'Hjem',
    onClick: (url: string) => console.log('going to url: ', url),
    toUrl: '/home',
  },
];

describe('AppBarNavList', () => {
  it('should render correctly', () => {
    render(
      <AppBarNavList pages={pages} onChange={() => void 0} selectedPage={0} />,
    );
  });
});
