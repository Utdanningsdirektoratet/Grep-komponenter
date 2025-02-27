import * as React from 'react';
import { useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useMobileStyles } from './styles';
import { keyboard } from '../../utils';

export interface NavigationProps {
  id: number;
  label: string;
  toUrl?: string;
  children?: NavigationProps[];
  linkIcon?: React.ReactElement<unknown>;
}

export interface AppBarNavListProps {
  pages: NavigationProps[];
}

const MobileAppBarNavList: React.FC<AppBarNavListProps> = ({
  pages,
}: AppBarNavListProps) => {
  const { classes } = useMobileStyles();
  const navigate = useNavigate();
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
              navigate(page?.toUrl || '');
            }}
            onKeyDown={keyboard.onActivation(() => navigate(page?.toUrl || ''))}
          >
            {page.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MobileAppBarNavList as React.ComponentType<AppBarNavListProps>;
