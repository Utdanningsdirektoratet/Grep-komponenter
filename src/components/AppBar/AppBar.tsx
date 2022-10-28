import * as React from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropdown from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {
  Toolbar,
  ToolbarInner,
  ToolbarMenu,
  ToolbarTitle,
  ToolbarMenuInner,
  ToolbarRight,
  ToolbarLeft,
  UserContainer,
  AccountName,
  ToolbarMenuItem,
  ToolbarFixer,
  EnvironmentTitle,
} from './MainAppStyles';

import MobileAppBar from './MobileAppBar';
import { Box } from '@mui/material';
import { IAuthorizedPage, UserMenuItem, v0colors } from './types';

type AppBarProps = {
  isProd: boolean;
  username: string;
  currentPath: string;
  appTitle: string;
  userMenuItems: UserMenuItem[];
  menuItems: IAuthorizedPage[];
  userRole?: string;
  colors: v0colors;
};

const AppBar: React.FunctionComponent<AppBarProps> = ({
  username,
  currentPath,
  isProd,
  appTitle,
  userMenuItems,
  menuItems,
  userRole,
  colors,
}: AppBarProps) => {
  const [userMenuAnchor, setUserMenuAnchor] =
    React.useState<HTMLAnchorElement | null>(null);

  const _handleIconButtonClick = (event: any) => {
    event.preventDefault();
    setUserMenuAnchor(event.currentTarget);
  };

  const _handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const _renderToolbarMenuItem = (page: IAuthorizedPage) => {
    const isActive = page?.exact
      ? currentPath === page.redirectUrl
      : currentPath.includes(page.redirectUrl || '');
    return (
      <ToolbarMenuItem
        className={isActive ? 'active' : ''}
        to={page.redirectUrl || ''}
        key={page.name}
        tabIndex={0}
      >
        {page?.translatedTextRef}
      </ToolbarMenuItem>
    );
  };

  return (
    <Toolbar>
      <ToolbarFixer>
        <ToolbarInner colors={colors} role="header">
          <ToolbarLeft>
            <ToolbarTitle to={'/'}>
              {appTitle}
              {!isProd && (
                <EnvironmentTitle>
                  {process.env.REACT_APP_HOST}
                </EnvironmentTitle>
              )}
            </ToolbarTitle>
          </ToolbarLeft>
          <ToolbarRight>
            <Button onClick={_handleIconButtonClick}>
              <AccountCircle color="primary" fontSize="large" />
              <UserContainer>
                <AccountName>{username}</AccountName>
                {userRole && (
                  <Box sx={{ fontSize: '14px', lineHeight: '20px' }}>
                    {userRole}
                  </Box>
                )}
              </UserContainer>
              <ArrowDropdown color="primary" />
            </Button>
            <Menu
              open={Boolean(userMenuAnchor)}
              anchorEl={userMenuAnchor}
              onClose={_handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {userMenuItems.map((i, index) => {
                return (
                  <Box key={i.id}>
                    <MenuItem
                      key={i.id}
                      onClick={() => {
                        setUserMenuAnchor(null);
                        i.action && i.action();
                      }}
                    >
                      {i.isAnchor ? (
                        <a
                          style={{
                            textDecoration: 'inherit',
                            color: 'inherit',
                          }}
                          rel="noreferrer"
                          href={i.href}
                        >
                          {i.label}
                        </a>
                      ) : (
                        i.label
                      )}
                    </MenuItem>

                    {userMenuItems.length > index + 1 && <Divider />}
                  </Box>
                );
              })}
            </Menu>
          </ToolbarRight>
        </ToolbarInner>
        <ToolbarMenu role="nav">
          <ToolbarMenuInner>
            {menuItems.map((page) => _renderToolbarMenuItem(page))}
          </ToolbarMenuInner>
        </ToolbarMenu>

        <MobileAppBar
          menuItems={menuItems}
          userMenuItems={userMenuItems}
          colors={colors}
        />
      </ToolbarFixer>
    </Toolbar>
  );
};

export default AppBar;
