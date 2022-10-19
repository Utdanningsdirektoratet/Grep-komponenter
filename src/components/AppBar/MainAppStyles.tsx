import { styled } from '@mui/material';
import { Theme, MUIStyledCommonProps } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { v0colors } from './types';

export const dimensions = {
  breadcrumbsFontSize: 16,
  contentWidth: 1028,
  footerHeight: 50,
  inputBoxHeight: 61,
  toolbarHeight: 80,
  toolbarHeightMobile: 40,
  toolbarWidth: 1260,
  toolbarMenuWidth: 1028,
  toolbarMenuHeight: 50,
};

export const ToolbarTitle = styled(NavLink)(() => ({
  display: 'flex',
  fontSize: '24px',
  color: '#303030',
  fontFamily: 'Montserrat',
  fontWeight: 500,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'none',
  },
}));

export const EnvironmentTitle = styled('div')(() => ({
  color: 'rgba(0, 0, 0, 0.33)',
  marginLeft: '17px',
}));

export const Toolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    height: `${
      dimensions.toolbarMenuHeight + dimensions.toolbarHeightMobile
    }px`,
    minHeight: `${
      dimensions.toolbarMenuHeight + dimensions.toolbarHeightMobile
    }px`,
    maxHeight: `${
      dimensions.toolbarMenuHeight + dimensions.toolbarHeightMobile
    }px`,
  },
  [theme.breakpoints.up('sm')]: {
    height: `${dimensions.toolbarMenuHeight + dimensions.toolbarHeight}px`,
    minHeight: `${dimensions.toolbarMenuHeight + dimensions.toolbarHeight}px`,
    maxHeight: `${dimensions.toolbarMenuHeight + dimensions.toolbarHeight}px`,
  },
}));

export const ToolbarFixer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 101,
  [theme.breakpoints.down('sm')]: {
    height: `${
      dimensions.toolbarMenuHeight + dimensions.toolbarHeightMobile
    }px`,
    minHeight: `${
      dimensions.toolbarMenuHeight + dimensions.toolbarHeightMobile
    }px`,
    maxHeight: `${
      dimensions.toolbarMenuHeight + dimensions.toolbarHeightMobile
    }px`,
  },
  [theme.breakpoints.up('sm')]: {
    height: `${dimensions.toolbarMenuHeight + dimensions.toolbarHeight}px`,
    minHeight: `${dimensions.toolbarMenuHeight + dimensions.toolbarHeight}px`,
    maxHeight: `${dimensions.toolbarMenuHeight + dimensions.toolbarHeight}px`,
  },
}));

export const ToolbarInner = styled('div')(
  ({ colors, theme }: { colors: v0colors } & MUIStyledCommonProps<Theme>) => {
    if (!theme) {
      return {};
    }
    return {
      alignItems: 'center',
      display: 'flex',
      margin: '0 auto',
      width: '100%',
      padding: 0,
      backgroundColor: colors.headerBackgroundColor,
      [theme.breakpoints.down('sm')]: {
        height: `${dimensions.toolbarHeightMobile}px`,
        minHeight: `${dimensions.toolbarHeightMobile}px`,
      },
      [theme.breakpoints.up('sm')]: {
        padding: 0,
        height: `${dimensions.toolbarHeight}px`,
        minHeight: `${dimensions.toolbarHeight}px`,
      },
    };
  },
);

export const ToolbarLeft = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  marginLeft: '40px',
}));

export const ToolbarRight = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginLeft: 'auto',
  marginRight: '40px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

export const UserContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 17px',
  textAlign: 'left',
  textTransform: 'none',
  fontWeight: '400',
  color: 'rgba(0, 0, 0, 0.87)',
}));

export const AccountName = styled('span')(() => ({
  fontSize: '18px',
  lineHeight: '25px',
}));

export const ToolbarMenu = styled('div')(({ theme }) => {
  return {
    backgroundColor: theme.palette.primary.main,
    height: `${dimensions.toolbarMenuHeight}px`,
    maxHeight: `${dimensions.toolbarMenuHeight}px`,
    minHeight: `${dimensions.toolbarMenuHeight}px`,
    width: '100%',

    display: 'flex',
    alignItems: 'center',
    fontFamily: 'MontSerrat, Helvetica Neue, Helvetica, Arial, sans-serif',
    boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  };
});

export const MobileToolbarMenu = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: `${dimensions.toolbarMenuHeight}px`,
  maxHeight: `${dimensions.toolbarMenuHeight}px`,
  minHeight: `${dimensions.toolbarMenuHeight}px`,
  width: '100%',
  flexGrow: 1,
  alignItems: 'center',
  fontFamily: 'MontSerrat, Helvetica Neue, Helvetica, Arial, sans-serif',
  boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export const ToolbarMenuInner = styled('div')(({ theme }) => ({
  display: 'flex',
  height: 'fit-content',
  maxWidth: `${dimensions.toolbarMenuWidth}px`,
  margin: '0 auto',
  [theme.breakpoints.down('lg')]: {
    padding: '0 24px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: 0,
  },
}));

const menuItemHoverGreen = '#B9E1CC';
export const ToolbarMenuItem = styled(NavLink)(({ theme }) => ({
  alignItems: 'center',
  borderRight: '1px solid #696868',
  color: theme.palette.background.default,
  cursor: 'pointer',
  display: 'flex',
  fontSize: '16px',
  padding: '0 17px',
  height: '100%',
  textTransform: 'capitalize',
  userSelect: 'none',
  position: 'relative',
  textDecoration: 'none',
  fontWeight: 500,

  ':first-child': {
    paddingLeft: 0,
    ':after': {
      marginLeft: '-24px',
    },
  },

  ':last-child': {
    borderRight: 'none',
  },

  ':after': {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '32px',
    marginLeft: '-16px',
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    opacity: 0,
    content: '""',
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
  },

  ':focus': {
    outline: 'none',
  },

  ':hover': {
    textDecoration: 'none',
    color: menuItemHoverGreen,
  },

  '.active:after, :hover:after, focus:after': {
    bottom: '-4px',
    opacity: '1',
  },
}));

export const MobileToolbarMenuItem = styled(NavLink)(() => ({
  alignItems: 'center',
  color: 'black',
  cursor: 'pointer',
  display: 'flex',
  height: '100%',
  textTransform: 'capitalize',
  userSelect: 'none',
  position: 'relative',
  textDecoration: 'none',
}));
