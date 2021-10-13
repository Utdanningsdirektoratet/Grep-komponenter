import * as React from 'react';
import { render } from '@testing-library/react';

import AppBarLogo from './AppBarLogo';

describe('AppBarLogo', () => {
  it('should render correctly', () => {
    render(<AppBarLogo title="" imageAlt="" environment="" imageSrc="" />);
  });
});
