import * as React from 'react';
import { shallow } from 'enzyme';

import DropdownMenu from './dropdown-menu';

describe('DropdownMenu', () => {
  it('should render correctly', () => {
    const component = shallow(
      <DropdownMenu
        anchorEl={null}
        open={false}
        menuItems={[]}
        onClose={() => void 1}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
