import * as React from 'react';
import { shallow } from 'enzyme';

import CenterLayout from './CenterLayout';

describe('CenterLayout', () => {
  it('should render correctly', () => {
    const component = shallow(<CenterLayout />);

    expect(component).toMatchSnapshot();
  });
});
