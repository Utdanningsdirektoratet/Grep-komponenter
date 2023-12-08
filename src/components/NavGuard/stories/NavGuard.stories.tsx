import React from 'react';
import Standard from './standard';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'NavGuard',
  render: () => <Standard />,
  decorators: [withRouter],
};

export const Default = () => {
  return <Standard />;
};

Default.storyName = 'Default';
