import * as React from 'react';
import { shallow } from 'enzyme';

import GrepTableCard from './GrepTableCard';

describe('GrepTableCard', () => {
  it('should render correctly', () => {
    const component = shallow(
      <GrepTableCard
        title=""
        curriculums={[]}
        onCurriculumClick={() => void 0}
        statuses={[]}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('it renders without props', () => {
    const component = shallow(<GrepTableCard />);
    component.render();
  });
});
