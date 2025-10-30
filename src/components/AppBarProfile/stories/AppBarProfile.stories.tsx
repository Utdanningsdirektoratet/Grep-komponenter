import * as React from 'react';
import { AppBarProfile } from '../..';

export default {
  title: 'AppBarProfile',
};

export const Standard = {
  render: () => (
    <AppBarProfile
      userRole={'Superbruker'}
      fullName={'Grep Fagansvarlig'}
      onButtonClick={() => console.log('Button clicked!')}
    />
  ),

  name: 'standard',
};
