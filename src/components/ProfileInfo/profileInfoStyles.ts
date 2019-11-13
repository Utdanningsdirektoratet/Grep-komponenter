import CleanPaper from '../CleanPaper';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';

export const Container = withStyles({
  root: {
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
  },
})(CleanPaper);

export const ProfileField = withStyles({
  root: {
    margin: '10px 0',
  },
})(TextField);
