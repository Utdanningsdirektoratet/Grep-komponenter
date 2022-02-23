import AppBar from '@mui/material/AppBar';
import { withStyles } from '../../../styling';

export const StyledAppBar = withStyles(AppBar, {
  root: {
    backgroundColor: 'transparant',
  },
  positionFixed: {
    left: 'unset',
    right: 'unset',
  },
});
