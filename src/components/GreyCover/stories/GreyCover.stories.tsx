import * as React from 'react';
import { MainLayout, GreyCover, SearchBar } from '../..';
import { Container } from '@mui/material';

export default {
  title: 'GreyCover',
};

export const GreyCoverWithContent = {
  render: () => (
    <MainLayout>
      <GreyCover elevation>
        <Container>
          <SearchBar onClear={() => void 0} onInputChange={() => void 0} />
        </Container>
      </GreyCover>
    </MainLayout>
  ),

  name: 'GreyCover with content',
};
