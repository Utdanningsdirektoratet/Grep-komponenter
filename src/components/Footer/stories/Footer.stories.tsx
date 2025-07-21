import * as React from 'react';
import { MainLayout, Footer } from '../..';
import { Switch } from '@mui/material';
import { FooterItem } from '..';

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

export default {
  title: 'Footer',
  excludeStories: ['footerItems'],
};

export const FooterWithContent = () => (
  <MainLayout>
    <Footer
      udirLogo={'src/assets/utdanningsdirektoratet-logo-rgb-neg.png'}
      udirLink="https://www.udir.no"
      serviceNameText="Tjenestenavn er levert av Utdanningsdirektoratet"
      items={footerItems}
    />
  </MainLayout>
);

FooterWithContent.story = {
  name: 'Footer with content',
};

export const FooterWithContentLongerThan100 = () => (
  <div style={{ display: 'block', width: '100%' }}>
    <div
      style={{ height: '120vh', backgroundColor: '', display: 'flex' }}
    ></div>
    <Footer
      udirLogo={'src/assets/utdanningsdirektoratet-logo-rgb-neg.png'}
      udirLink="https://www.udir.no"
      serviceNameText="Tjenestenavn er levert av Utdanningsdirektoratet"
      items={footerItems}
    />
  </div>
);

FooterWithContentLongerThan100.story = {
  name: 'Footer with content, longer than 100%',
};
