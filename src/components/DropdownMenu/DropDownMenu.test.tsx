import * as React from 'react';
import { render } from '@testing-library/react';

import DropdownMenu from './dropdown-menu';

describe('DropdownMenu', () => {
  it('should render correctly', () => {
    render(
      <DropdownMenu
        anchorEl={null}
        open={false}
        menuItems={[]}
        onClose={() => void 1}
      />,
    );
  });
});
