import * as React from 'react';
import { shallow } from 'enzyme';

import GreyCover from './GreyCover';

describe('GreyCover', () => {
  it('should render correctly', () => {
    const component = shallow(<GreyCover />);

    expect(component).toMatchSnapshot();
  });
});
