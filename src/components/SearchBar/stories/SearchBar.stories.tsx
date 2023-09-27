import * as React from 'react';
import { Container } from '@mui/material';
import SearchBar from '..';

export default {
  title: 'SearchBar',
};

export const Standard = () => (
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
);

Standard.story = {
  name: 'standard',
};
