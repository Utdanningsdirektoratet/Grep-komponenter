import * as React from 'react';
import GrepCrumbs, { Breadcrumb } from '..';

export const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Driftsmeldinger',
    path: '/?service-messages',
  },
  {
    label: 'Administrer brukere',
    path: '/?manage-users',
  },
];

export default {
  title: 'GrepCrumbs',
  excludeStories: ['breadcrumbs'],
};

export const Standard = {
  render: () => (
    <GrepCrumbs
      breadcrumbs={[...breadcrumbs, { label: 'Test ' }]}
      onClick={(page) => console.log('clicked on ', page.label)}
    />
  ),

  name: 'standard',
};

export const OverflowAsTooltip = {
  render: () => (
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
  ),

  name: 'overflow as tooltip',
};
