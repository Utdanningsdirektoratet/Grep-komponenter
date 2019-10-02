import React from 'react';
import { storiesOf } from '@storybook/react';

import Scaffold from './_scaffold';
import Standard from './standard';

storiesOf('NavGuard', module).add('standard', () => <Scaffold><Standard/></Scaffold>);
