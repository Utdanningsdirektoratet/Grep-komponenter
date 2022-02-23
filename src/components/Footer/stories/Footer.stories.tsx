import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MainLayout, Footer } from '../..';
import { Switch } from '@mui/material';
import { FooterItem } from '..';

export const footerItems: FooterItem[] = [
  {
    label: '© 2018 Utdanningsdirektoratet. Alle rettigheter forbeholdt.',
  },
  {
    label: 'Versjon 0.0.35',
  },
  {
    label: 'Personvern',
    onClickItem: () => console.log('test'),
  },
  {
    label: 'Kontakt',
    onClickItem: () => console.log('test'),
  },
  {
    label: 'Custom',
    render: (renderLabel) => (
      <React.Fragment>
        <Switch color="secondary" />
        {renderLabel()}
      </React.Fragment>
    ),
  },
];

storiesOf('Footer', module).add('Footer with content', () => (
  <MainLayout>
    <Footer items={footerItems} />
  </MainLayout>
));

storiesOf('Footer', module).add('Footer with content, longer than 100%', () => (
  <div style={{ display: 'block', width: '100%' }}>
    <div
      style={{ height: '120vh', backgroundColor: '', display: 'flex' }}
    ></div>
    <Footer items={footerItems} />
  </div>
));
