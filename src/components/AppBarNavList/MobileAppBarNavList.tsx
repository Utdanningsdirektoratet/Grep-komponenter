import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useMobileStyles } from './styles';
import { Utils } from '../..';

export interface NavigationProps {
  id: number;
  label: string;
  toUrl?: string;
  children?: NavigationProps[];
  linkIcon?: React.ReactElement<any>;
}

export interface AppBarNavListProps {
  pages: NavigationProps[];
}

const MobileAppBarNavList: React.FC<AppBarNavListProps> = ({
  pages,
}: AppBarNavListProps) => {
  const { classes } = useMobileStyles();
  const history = useHistory();
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

  return (
    <Box style={{ flexGrow: 1 }} className={classes.mobileNavList}>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="menu"
        style={{ marginRight: 2 }}
        onClick={handleClickNav}
      >
        <MenuIcon fontSize="large" />
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
        {pages.map((page) => (
          <MenuItem
            key={page.id}
            onClick={() => {
              handleCloseNav();
              history.push(page?.toUrl || '');
            }}
            onKeyDown={Utils.keyboard.onActivation(() =>
              history.push(page?.toUrl || ''),
            )}
          >
            {page.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MobileAppBarNavList as React.ComponentType<AppBarNavListProps>;
