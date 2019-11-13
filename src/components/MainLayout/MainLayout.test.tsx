import * as React from 'react';
import { shallow } from 'enzyme';

import MainLayout from './MainLayout';

describe('MainLayout', () => {
  it('should render correctly', () => {
    const component = shallow(<MainLayout><p>test</p></MainLayout>);

    expect(component).toMatchSnapshot();
  });
});
