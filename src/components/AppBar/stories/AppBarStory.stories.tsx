import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AppBar from '../AppBar';
import MainLayout from '../../MainLayout';
import { IAuthorizedPage } from '../types';

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

storiesOf('AppBar', module).add('with content', () => {
  return (
    <MainLayout>
      <div>
        <AppBar
          appTitle="Læreplanutvikleren"
          isProd={false}
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
      </div>
    </MainLayout>
  );
});
