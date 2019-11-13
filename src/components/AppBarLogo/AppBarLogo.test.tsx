import * as React from 'react';
import { shallow } from 'enzyme';

import AppBarLogo from './AppBarLogo';

describe('AppBarLogo', () => {
  it('should render correctly', () => {
    const component = shallow(
      <AppBarLogo title="" imageAlt="" environment="" imageSrc="" />,
    );

    expect(component).toMatchSnapshot();
  });
});
