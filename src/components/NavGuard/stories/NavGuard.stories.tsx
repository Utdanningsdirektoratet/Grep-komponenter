import * as React from 'react';
import { Box } from '@mui/system';
import NavGuard from '..';
import { IAuthorizedPage } from '../../AppBar/types';
import AppBar from '../../AppBar/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export const v0colors = {
  primary: '#3FB8AF',
  secondary: '#FF9E9D',
  body: '#fff',
  headerBackgroundColor: '#F4F4F4',
  borderColor: '#D8D8D8',
  primaryFade: '#F1F3F4',
  greyText: '#f2f2f2',
  placeholderText: '#848484',
  textColor: 'rgba(0, 0, 0, .87)',
  textColorFade: 'rgba(0, 0, 0, .56)',
  textColorMoreFade: 'rgba(0, 0, 0, .45)',
  white: '#fff',
  lightGrey: '#DCDCDC',
};

const navbarPages: IAuthorizedPage[] = [
  {
    name: 'home',
    path: '/iframe.html',
    redirectUrl: '/iframe.html',
    exact: true,
    translatedTextRef: 'Hjem',
  },
  {
    name: 'curriculums',
    path: '/curriculums',
    redirectUrl: '/curriculums',
    exact: true,
    translatedTextRef: 'Læreplaner',
  },
  {
    name: 'Metadata',
    path: '/metadata',
    redirectUrl: '/metadata',
    exact: true,
    translatedTextRef: 'Metadata',
  },
  {
    name: 'admin',
    path: '/admin',
    redirectUrl: '/admin',
    exact: true,
    translatedTextRef: 'Administrasjon',
  },
];

export default {
  title: 'NavGuard',
  excludeStories: ['v0colors'],
};

export const Default = () => {
  const navigate = useNavigate();
  const [where, setWhere] = React.useState<string>('/elsewhere');
  const [count, setCount] = React.useState<number>(0);
  const props = {
    when: true,
    title: `Confirm navigation from: ${where}`,
    txt: 'You have created or unstored data, leaving this page will discard all changes!',
    txtDiscard: 'Discard',
    txtCancel: 'Cancel',
    txtSave: 'Save',
    onCancel: () => {
      setWhere('CancelLocation' + count);
      setCount(count + 1);
    },
    onDiscard: () => {
      setWhere('DiscardLocation' + count);
      setCount(count + 1);
    },
    onSave: () => {
      setWhere('SaveLocation' + count);
      setCount(count + 1);
    },
  };
  return (
    <Box>
      <NavGuard {...props} />
      <Button onClick={() => navigate(where)}>Test me</Button>
    </Box>
  );
};

Default.storyName = 'Default';

export const WithAppBar = () => {
  const props = {
    when: true,
    title: 'Confirm navigation',
    txt: 'You have created or unstored data, leaving this page will discard all changes!',
    txtDiscard: 'Discard',
    txtCancel: 'Cancel',
    txtSave: 'Save',
    onSave: () => console.log('Save clicked'),
    onDiscard: () => console.log('Discard clicked'),
    onCancel: () => console.log('Cancel clicked'),
  };
  return (
    <Box display="flex" flexDirection="column">
      <NavGuard {...props} />
      <AppBar
        appTitle="Læreplanutvikleren"
        isProd={false}
        colors={v0colors}
        currentPath="/iframe.html"
        menuItems={navbarPages}
        userMenuItems={[
          {
            id: 'profile',
            action: () => {
              console.log('profile');
            },
            label: 'Profil',
          },
          {
            id: 'manual',
            href: '/test.docx',
            isAnchor: true,
            label: 'Test',
          },
          {
            id: 'logout',
            action: () => {
              console.log('logout');
            },
            label: 'Logg ut',
          },
        ]}
        username="Grep bruker"
        userRole="Systemadministrator"
      />
    </Box>
  );
};

WithAppBar.storyName = 'With AppBar';
