import * as React from 'react';
import { Box } from '@mui/system';
import NavGuard, { NavGuardProperties } from '..';
import { IAuthorizedPage } from '../../AppBar/types';
import AppBar from '../../AppBar/AppBar';
import { useLocation, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { Meta, StoryObj } from '@storybook/react-vite';

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

type testType = 'button' | 'appBar';

const TestNavGuard = (
  args: Omit<
    NavGuardProperties,
    'onCancel' | 'onSave' | 'onDiscard' | 'title'
  > & {
    testType: testType;
  },
) => {
  const { testType } = args;
  const navigate = useNavigate();
  const location = useLocation();
  const [where, setWhere] = React.useState<string>('/elsewhere');
  const [count, setCount] = React.useState<number>(0);
  const onCancel = () => {
    if (testType === 'button') {
      setWhere('CancelLocation' + count);
      setCount(count + 1);
    } else {
      console.log('Cancel clicked');
    }
  };
  const onDiscard = () => {
    if (testType === 'button') {
      setWhere('DiscardLocation' + count);
      setCount(count + 1);
    } else {
      console.log('Discard clicked');
    }
  };
  const onSave = () => {
    if (testType === 'button') {
      setWhere('SaveLocation' + count);
      setCount(count + 1);
    } else {
      console.log('Save clicked');
    }
  };
  return (
    <Box>
      <NavGuard
        onCancel={onCancel}
        onDiscard={onDiscard}
        onSave={onSave}
        title={
          'Confirm navigation ' +
          (testType === 'button' ? `from: ${where}` : '')
        }
        {...args}
      />
      {testType === 'button' && (
        <Button onClick={() => navigate(where)}>Test me</Button>
      )}
      {testType === 'appBar' && (
        <>
          <AppBar
            appTitle="Læreplanutvikleren"
            environmentTitle={'STORYBOOK'}
            colors={v0colors}
            currentPath="/iframe.html"
            menuItems={navbarPages}
            userMenuItems={[
              {
                id: 'doesNotWork',
                action: () => {
                  console.log('doesNotWork');
                },
                label: 'DoesNotWork',
              },
            ]}
            username="Grep bruker"
            userRole="something"
          />
          <h1>Current Location: {location.pathname}</h1>
        </>
      )}
    </Box>
  );
};

const meta = {
  args: {
    when: true,
    txt: 'You have created or unstored data, leaving this page will discard all changes!',
    txtDiscard: 'Discard',
    txtCancel: 'Cancel',
    txtSave: 'Save',
    testType: 'button',
  },
  render: ({ ...args }) => <TestNavGuard {...args} />,
  title: 'NavGuard',
  excludeStories: ['v0colors'],
} satisfies Meta<typeof TestNavGuard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
};

export const WithAppBar: Story = {
  name: 'With AppBar',
  args: { testType: 'appBar' },
};

export const WithExclude: Story = {
  args: {
    testType: 'appBar',
    exclude: [
      { current: '/metadata', next: '/admin' },
      { current: '/admin', next: '/metadata' },
    ],
  },

  name: 'With Exclude',
};
