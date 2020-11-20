import * as React from 'react';
import { storiesOf } from '@storybook/react';
import GrepCrumbs, { Breadcrumb } from './GrepCrumbs';

export const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Driftsmeldinger',
    path: '/service-messages',
  },
  {
    label: 'Administrer brukere',
    path: '/manage-users',
  },
];

storiesOf('GrepCrumbs', module)
  .add('standard', () => (
    <GrepCrumbs
      breadcrumbs={[...breadcrumbs, { label: 'Test ' }]}
      onClick={(page) => console.log('clicked on ', page.label)}
    />
  ))
  .add('overflow as tooltip', () => (
    <div style={{ maxWidth: 500 }}>
      <GrepCrumbs
        breadcrumbs={[
          ...breadcrumbs,
          {
            label: 'Very very very very very very very very very very label',
          },
        ]}
      />
    </div>
  ));
