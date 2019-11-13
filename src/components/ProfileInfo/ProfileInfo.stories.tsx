import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileInfo from './ProfileInfo';

export const user = {
  firstName: 'Ola',
  lastName: 'Nordmann',
  email: 'ola.nordmann@gmail.com',
  phoneNumber: '12345678',
  role: 'Systemadministrator',
};

storiesOf('ProfileInfo', module).add('standard', () => (
  <ProfileInfo {...user} />
));
