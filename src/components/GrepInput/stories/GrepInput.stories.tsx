import * as React from 'react';
import GrepInput from '..';
import { Container } from '@mui/material';

export default {
  title: 'GrepInput',

  decorators: [
    (storyFn: any) => (
      <Container
        style={{
          marginTop: 40,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {storyFn()}
      </Container>
    ),
  ],
};

export const Input = () => (
  <React.Fragment>
    <GrepInput label="Med feilmelding" errorMessage="Feilmelding" />
    <GrepInput label="Med hjelpetekst" helperText="Hjelpetekst" />
    <GrepInput label="Med placeholder" placeholder="Placeholder" />
    <GrepInput label="Multiline" placeholder="Placeholder" multiline rows="4" />
  </React.Fragment>
);

export const InputOutlined = {
  render: () => (
    <React.Fragment>
      <GrepInput
        shrink
        variant="outlined"
        label="Med feilmelding"
        errorMessage="Feilmelding"
      />
      <GrepInput
        shrink
        variant="outlined"
        label="Med hjelpetekst"
        helperText="Hjelpetekst"
      />
      <GrepInput
        shrink
        variant="outlined"
        label="Med placeholder"
        placeholder="Placeholder"
      />
      <GrepInput
        shrink
        variant="outlined"
        label="Multiline"
        placeholder="Placeholder"
        multiline
        rows="4"
      />
    </React.Fragment>
  ),

  name: 'InputOutlined',
};
