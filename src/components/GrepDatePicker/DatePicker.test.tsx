import * as React from 'react';
import { shallow } from 'enzyme';

import DatePicker from './DatePicker';

describe('DatePicker', () => {
  it('should render correctly', () => {
    const component = shallow(
      <DatePicker
        onChange={console.log}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
