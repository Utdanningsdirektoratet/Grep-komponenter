import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CenterLayout from '../CenterLayout/CenterLayout';
import GrepInput from './GrepInput';

storiesOf('GrepInput', module)
  .addDecorator(storyFn => (
    <CenterLayout
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {storyFn()}
    </CenterLayout>
  ))
  .add('Input', () => (
    <React.Fragment>
      <GrepInput label="Med feilmelding" errorMessage="Feilmelding" />
      <GrepInput label="Med hjelpetekst" helperText="Hjelpetekst" />
      <GrepInput label="Med placeholder" placeholder="Placeholder" />
      <GrepInput
        label="Multiline"
        placeholder="Placeholder"
        multiline
        rows="4"
      />
    </React.Fragment>
  ))
  .add('InputOutlined', () => (
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
  ));
