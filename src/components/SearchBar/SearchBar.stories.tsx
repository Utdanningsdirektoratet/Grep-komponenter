import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SearchBar from './SearchBar';
import CenterLayout from '../CenterLayout';

storiesOf('SearchBar', module).add('standard', () => (
  <CenterLayout style={{ marginTop: 40 }}>
    <SearchBar
      placeholder={'Skriv inn søketekst'}
      onInputChange={val => console.log(val)}
      helpText={'Her kan du søke etter ting'}
      onClear={() => console.log('value cleared')}
      onSearchAll={() => console.log('clicked searchAll')}
      searchAllText={'Vis alt'}
      outlined
    />
  </CenterLayout>
));
