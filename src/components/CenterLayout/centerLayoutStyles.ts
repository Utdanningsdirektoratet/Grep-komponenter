import withStyles from '@material-ui/core/styles/withStyles';
import CleanPaper from '../CleanPaper';

export const StyledCenterLayout = withStyles({
  root: {
    backgroundColor: 'transparent',
    margin: '0 auto',
    maxWidth: 1028,
    width: '100%',
  },
})(CleanPaper);
