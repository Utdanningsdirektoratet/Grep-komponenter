import CleanPaper from '../CleanPaper';
import withStyles from '@material-ui/core/styles/withStyles';

export const Container = withStyles({
  root: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    fontSize: 16,
  },
})(CleanPaper);

export const Current = withStyles({
  root: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
})(CleanPaper);
