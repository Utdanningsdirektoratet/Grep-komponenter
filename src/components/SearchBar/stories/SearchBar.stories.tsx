import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container } from '@material-ui/core';
import SearchBar from '..';

storiesOf('SearchBar', module).add('standard', () => (
  <Container style={{ marginTop: 40 }}>
    <SearchBar
      placeholder={'Skriv inn søketekst'}
      onInputChange={(val) => console.log(val)}
      helpText={'Her kan du søke etter ting'}
      onClear={() => console.log('value cleared')}
      onSearchAll={() => console.log('clicked searchAll')}
      searchAllText={'Vis alt'}
      outlined
    />
  </Container>
));
