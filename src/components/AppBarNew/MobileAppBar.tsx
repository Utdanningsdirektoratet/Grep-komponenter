import {
  AppBar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import MoreVert from '@mui/icons-material/MoreVert';
import * as React from 'react';

import { MobileToolbarMenu, MobileToolbarMenuItem } from './MainAppStyles';
import { IAuthorizedPage, UserMenuItem, v0colors } from './types';

type Props = {
  userMenuItems: UserMenuItem[];
  menuItems: IAuthorizedPage[];
  colors: v0colors;
};

const MobileAppBar: React.FunctionComponent<Props> = ({
  userMenuItems,
  menuItems,
}: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const openNav = Boolean(anchorElNav);
  const handleClickNav = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNav = () => {
    setAnchorElNav(null);
  };

  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null,
  );
  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  return (
    <MobileToolbarMenu style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ minHeight: '50px' }}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ marginRight: 2 }}
            onClick={handleClickNav}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorElNav}
            open={openNav}
            onClose={handleCloseNav}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {menuItems.map((page) => (
              <MobileToolbarMenuItem
                key={page.name}
                to={page.redirectUrl || ''}
              >
                <MenuItem
                  sx={{
                    width: '100%',
                  }}
                  key={page.name}
                >
                  {page.translatedTextRef}
                </MenuItem>
              </MobileToolbarMenuItem>
            ))}
          </Menu>
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="menu"
            style={{ marginLeft: 'auto' }}
            onClick={handleClickMenu}
          >
            <MoreVert sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorElMenu}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {userMenuItems.map((i, index) => (
              <>
                <MenuItem
                  key={i.id}
                  onClick={() => {
                    handleCloseMenu();
                    i.action();
                  }}
                >
                  {i.label}
                </MenuItem>
                {userMenuItems.length > index + 1 && <Divider />}
              </>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </MobileToolbarMenu>
  );
};

export default MobileAppBar;
