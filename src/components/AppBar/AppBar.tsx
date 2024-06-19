import * as React from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropdown from '@mui/icons-material/ArrowDropDown';
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
import { ReactNode } from 'react';

type AppBarProps = {
  environmentTitle: string;
  username: string;
  currentPath: string;
  appTitle: string;
  userMenuItems: UserMenuItem[];
  menuItems: IAuthorizedPage[];
  userRole?: string;
  colors: v0colors;
  children?: ReactNode;
};

const AppBar: React.FunctionComponent<AppBarProps> = ({
  username,
  currentPath,
  environmentTitle,
  appTitle,
  userMenuItems,
  menuItems,
  userRole,
  colors,
}: AppBarProps) => {
  const [userMenuAnchor, setUserMenuAnchor] =
    React.useState<HTMLAnchorElement | null>(null);

  const _handleIconButtonClick = (event: React.BaseSyntheticEvent) => {
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
        <ToolbarInner colors={colors} role="banner">
          <ToolbarLeft>
            <ToolbarTitle to={'/'}>
              {appTitle}
              {!(environmentTitle === 'PROD') && (
                <EnvironmentTitle>{environmentTitle}</EnvironmentTitle>
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
              {userMenuItems.map((i, index) => {
                return (
                  <MenuItem
                    key={i.id}
                    onClick={() => {
                      setUserMenuAnchor(null);
                      i.action && i.action();
                    }}
                    divider={userMenuItems.length > index + 1}
                    sx={{
                      ':focus': {
                        textDecoration: 'underline',
                      },
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
                        onClick={i.onClick}
                      >
                        {i.label}
                      </a>
                    ) : (
                      i.label
                    )}
                  </MenuItem>
                );
              })}
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
