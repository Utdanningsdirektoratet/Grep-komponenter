import React from 'react';
import Scaffold from './_scaffold';
import Standard from './standard';


export default {
  title: 'Table of contents'
}

export const Default = () => {
  return (
// storiesOf('Table of contents', module).add('standard', () => (
    <Scaffold>
      <Standard />
    </Scaffold>
  )
};

Default.story = {
  name: 'standard'
}
