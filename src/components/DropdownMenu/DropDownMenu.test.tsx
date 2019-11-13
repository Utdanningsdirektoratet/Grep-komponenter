import * as React from 'react';
import { shallow } from 'enzyme';

import DropdownMenu from './DropdownMenu';

describe('DropdownMenu', () => {
  it('should render correctly', () => {
    const component = shallow(
      <DropdownMenu
        menuAnchor={null}
        menuItems={[]}
        menuOpen={false}
        onMenuClose={() => void 1}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
