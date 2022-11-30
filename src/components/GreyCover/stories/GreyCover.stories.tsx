import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MainLayout, GreyCover, SearchBar } from '../..';
import { Container } from '@mui/material';

storiesOf('GreyCover', module).add('GreyCover with content', () => (
  <MainLayout>
    <GreyCover elevation>
      <Container>
        <SearchBar onClear={() => void 0} onInputChange={() => void 0} />
      </Container>
    </GreyCover>
  </MainLayout>
));