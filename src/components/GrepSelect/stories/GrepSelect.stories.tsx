import React, { useState } from 'react';
import GrepSelect, { SelectItem } from '..';
import { Container } from '@mui/material';

const selectItems: SelectItem[] = [
  {
    value: 'Test',
    label: 'test',
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

export const Standard = () => {
  const [selected, setSelected] = useState<string | number>(
    selectItems[0].value,
  );
  const [selected1, setSelected1] = useState<string | number>(
    selectItems[0].value,
  );
  const [selected2, setSelected2] = useState<string | number>(
    selectItems[0].value,
  );
  return (
    <React.Fragment>
      <GrepSelect
        value={selected}
        label="Med feilmelding"
        errorMessage="Feilmelding"
        selectItems={selectItems}
        onChange={(e) => setSelected(e.target.value as string)}
      />
      <GrepSelect
        value={selected1}
        label="Med hjelpetekst"
        helperText="Hjelpetekst"
        selectItems={selectItems}
        onChange={(e) => setSelected1(e.target.value as string)}
      />
      <GrepSelect
        value={selected2}
        label="Med kjempelang label bla bla bla"
        selectItems={selectItems}
        onChange={(e) => setSelected2(e.target.value as string)}
      />
    </React.Fragment>
  );
};

export const Outlined = () => {
  const [selected, setSelected] = useState<string | number>(
    selectItems[0].value,
  );
  const [selected1, setSelected1] = useState<string | number>(
    selectItems[0].value,
  );
  const [selected2, setSelected2] = useState<string | number>(
    selectItems[0].value,
  );
  return (
    <React.Fragment>
      <GrepSelect
        value={selected}
        outlined
        label="Med feilmelding"
        errorMessage="Feilmelding"
        selectItems={selectItems}
        onChange={(e) => setSelected(e.target.value as string)}
      />
      <GrepSelect
        value={selected1}
        outlined
        label="Med hjelpetekst"
        helperText="Hjelpetekst"
        selectItems={selectItems}
        onChange={(e) => setSelected1(e.target.value as string)}
      />
      <GrepSelect
        value={selected2}
        outlined
        MenuProps={{ MenuListProps: { sx: { maxHeight: '400px' } } }}
        label="Med kjempelang label bla bla bla"
        selectItems={selectItems}
        onChange={(e) => setSelected2(e.target.value as string)}
      />
    </React.Fragment>
  );
};
