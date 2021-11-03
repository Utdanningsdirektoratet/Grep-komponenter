import * as React from 'react';
import { storiesOf } from '@storybook/react';
import InfoContainer, { InfoField } from '..';

const infoFields: InfoField[] = [
  {
    key: 'Field #1',
    value: 'Ukjent',
  },
  {
    key: 'Field #2',
    value: '09.05.19',
  },
  {
    key: 'Field #3',
    value: 'Blabla',
  },
  {
    key: 'Field #4',
    value: 'Blabla',
  },
  {
    key: 'Field #5',
    value: 'Blabla',
  },
  {
    key: 'Field #6',
    value: 'Blabla',
  },
];

storiesOf('InfoContainer', module)
  .add('Horizontal fields', () => (
    <InfoContainer inline header="Horizontal fields" infoFields={infoFields} />
  ))
  .add('Vertical fields', () => (
    <InfoContainer header="Vertical fields" infoFields={infoFields} />
  ));
