import * as React from 'react';
import { render } from '@testing-library/react';

import AppBar from './AppBar';
import AppBarNavList from '../AppBarNavList';

const pages = [
  {
    id: 1,
    label: 'Test #1',
  },
  {
    id: 2,
    label: 'Test #2',
  },
];

const AppBarComponent = () => {
  return (
    <AppBar>
      <div style={{ display: 'flex' }}>
        <AppBarNavList
          pages={pages}
          selectedPage={pages[0].id}
          onChange={(number) => console.log('index: ', number)}
        />
      </div>
    </AppBar>
  );
};

describe('AppBar', () => {
  it('should render correctly', () => {
    const { container, getAllByRole } = render(<AppBarComponent />);
    const header = container.querySelector('header');
    const tabs = getAllByRole('tab');

    // header is visible
    expect(header).toBeVisible();

    // header tabs have correct length
    expect(tabs.length).toBe(pages.length);

    // header tabs have correct label
    tabs.forEach((tab, index) => {
      expect(tab).toHaveTextContent(pages[index].label);
    });
  });
});
