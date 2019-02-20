import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import colors from "./colors";

export const dimensions = {
  breadcrumbsFontSize: 16,
  contentWidth: 1028,
  footerHeight: 50,
  inputBoxHeight: 61,
  toolbarHeight: 80,
  toolbarWidth: 1260,
  toolbarMenuWidth: 1028,
  toolbarMenuHeight: 40
};

export const Theme = createMuiTheme({
  /* theme for v3.x */
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.white
    },
    secondary: {
      main: colors.secondary
    },
    background: {
      default: colors.white
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 16,
    fontFamily: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"].join(",")
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "inherit"
      }
    },
    MuiChip: {
      avatar: {
        fontSize: 14
      }
    },
    MuiDialog: {
      paper: {
        minWidth: "45rem"
      }
    }
  }
});
