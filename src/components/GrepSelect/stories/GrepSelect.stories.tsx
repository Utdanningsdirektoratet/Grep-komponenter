import * as React from 'react';
import { action } from '@storybook/addon-actions';
import GrepSelect, { SelectItem } from '..';
import { Container } from '@mui/material';

const selectItems: SelectItem[] = [
  {
    value: 'Test',
  },
  {
    value: 'Best',
    label: 'Custom label (value is Best)',
  },
];

export default {
  title: 'GrepSelect',

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

export const Standard = () => (
  <React.Fragment>
    <GrepSelect
      value={'Test'}
      label="Med feilmelding"
      errorMessage="Feilmelding"
      selectItems={selectItems}
      onChange={action('select med feilmelding change')}
    />
    <GrepSelect
      value={'Test'}
      label="Med hjelpetekst"
      helperText="Hjelpetekst"
      selectItems={selectItems}
      onChange={action('select med hjelpetekst change')}
    />
    <GrepSelect
      value={'Test'}
      label="Med kjempelang label bla bla bla"
      selectItems={selectItems}
      onChange={action('select med lang-label change')}
    />
  </React.Fragment>
);

export const Outlined = () => (
  <React.Fragment>
    <GrepSelect
      value={'Test'}
      outlined
      label="Med feilmelding"
      errorMessage="Feilmelding"
      selectItems={selectItems}
      onChange={action('outlined-select med feilmelding change')}
    />
    <GrepSelect
      value={'Test'}
      outlined
      label="Med hjelpetekst"
      helperText="Hjelpetekst"
      selectItems={selectItems}
      onChange={action('outlined-select med hjelpetekst change')}
    />
    <GrepSelect
      value={'Test'}
      outlined
      MenuProps={{ MenuListProps: { sx: { maxHeight: '400px' } } }}
      label="Med kjempelang label bla bla bla"
      selectItems={selectItems}
      onChange={action('outlined-select med lang-label change')}
    />
  </React.Fragment>
);
