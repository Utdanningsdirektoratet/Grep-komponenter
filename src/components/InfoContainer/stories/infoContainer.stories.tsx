import * as React from 'react';
import InfoContainer, { InfoFieldType } from '..';

const infoFields: InfoFieldType[] = [
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

export default {
  title: 'InfoContainer',
};

export const HorizontalFields = {
  render: () => (
    <InfoContainer inline header="Horizontal fields" infoFields={infoFields} />
  ),

  name: 'Horizontal fields',
};

export const VerticalFields = {
  render: () => (
    <InfoContainer header="Vertical fields" infoFields={infoFields} />
  ),

  name: 'Vertical fields',
};
