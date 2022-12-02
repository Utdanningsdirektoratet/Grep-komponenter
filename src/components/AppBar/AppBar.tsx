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

  const renderMenuItems = () => {
    const newItemList: UserMenuItem[] = [];
    userMenuItems.forEach((item, index) => {
      newItemList.push(item);
      if (userMenuItems.length > index + 1) {
        newItemList.push({ isDivider: true, id: '', label: '' });
      }
    });

    return newItemList.map((i, index) => {
      return i.isDivider ? (
        <Divider key={index} />
      ) : (
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
              tabIndex={-1}
              rel="noreferrer"
              href={i.href}
              onClick={i.onClick}
            >
              {i.label}
            </a>
          ) : (
            i.label
          )}
        </MenuItem>
      );
    });
  };

  return (
    <Toolbar>
      <ToolbarFixer>
        <ToolbarInner colors={colors} role="banner">
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
            <Button
              aria-controls={userMenuAnchor ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={userMenuAnchor ? 'true' : undefined}
              onClick={_handleIconButtonClick}
            >
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
              {renderMenuItems()}
            </Menu>
          </ToolbarRight>
        </ToolbarInner>
        <ToolbarMenu role="navigation">
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
