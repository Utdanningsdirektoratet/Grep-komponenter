import * as React from 'react';
import ProfileInfo from '..';

export const user = {
  firstName: 'Ola',
  lastName: 'Nordmann',
  email: 'ola.nordmann@gmail.com',
  phoneNumber: '12345678',
  role: 'Systemadministrator',
};

export default {
  title: 'ProfileInfo',
  excludeStories: ['user'],
};

export const Standard = () => <ProfileInfo {...user} />;

Standard.story = {
  name: 'standard',
};
