import * as React from 'react';
import AppBar from '../AppBar';
import { IAuthorizedPage } from '../types';
import { Box } from '@mui/system';

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
    path: '/',
    redirectUrl: '/',
    exact: true,
    translatedTextRef: 'Hjem',
  },
  {
    name: 'curriculums',
    path: '/curriculums',
    redirectUrl: '/',
    exact: true,
    translatedTextRef: 'Læreplaner',
  },
  {
    name: 'Metadata',
    path: '/metadata',
    redirectUrl: '/',
    exact: true,
    translatedTextRef: 'Metadata',
  },
  {
    name: 'admin',
    path: '/admin',
    redirectUrl: '/',
    exact: true,
    translatedTextRef: 'Administrasjon',
  },
  {
    name: 'admin2',
    path: '/admin2',
    redirectUrl: '/',
    exact: true,
    translatedTextRef: 'Administrasjon2',
  },
];

export default {
  title: 'AppBar',
  excludeStories: ['v0colors'],
};

export const WithContent = () => {
  return (
    <Box display="flex" flexDirection="column">
      <AppBar
        appTitle="Læreplanutvikleren"
        environmentTitle={'UTVIKLING'}
        colors={v0colors}
        currentPath="/"
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

WithContent.story = {
  name: 'with content',
};
