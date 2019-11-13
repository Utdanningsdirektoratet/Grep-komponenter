import CleanPaper from '../CleanPaper';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const Container = withStyles({
  root: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    fontSize: 16,
  },
})(CleanPaper);

export const PreviousContainer = withStyles({
  root: {
    display: 'flex',
  },
})(CleanPaper);

export const CrumbSign = withStyles({
  root: {
    margin: '0 8px',
  },
})(CleanPaper);

const prevStyles = ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.primary.main,
      cursor: 'pointer',
      textDecoration: 'underline',
      userSelect: 'none',
    },
  });

export const Previous = withTheme(withStyles(prevStyles)(CleanPaper));

export const Current = withStyles({
  root: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
})(CleanPaper);
