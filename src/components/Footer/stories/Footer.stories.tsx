import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MainLayout, Footer } from '../..';
import { Switch } from '@mui/material';
import { FooterItem } from '..';
import { UdirLogo } from '../../../assets';

export const footerItems: FooterItem[] = [
  {
    label: 'Versjon: v0.0.1',
  },
  {
    label: 'Om Tjenestenavn',
    onClickItem: () => console.log('test'),
  },
  {
    label: 'Personvernerklæring',
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
    <Footer
      udirLogo={UdirLogo}
      udirLink="https://www.udir.no"
      serviceNameText="Tjenestenavn er levert av Utdanningsdirektoratet"
      items={footerItems}
    />
  </MainLayout>
));

storiesOf('Footer', module).add('Footer with content, longer than 100%', () => (
  <div style={{ display: 'block', width: '100%' }}>
    <div
      style={{ height: '120vh', backgroundColor: '', display: 'flex' }}
    ></div>
    <Footer
      udirLogo={UdirLogo}
      udirLink="https://www.udir.no"
      serviceNameText="Tjenestenavn er levert av Utdanningsdirektoratet"
      items={footerItems}
    />
  </div>
));
