import CleanPaper from '../CleanPaper';
import { Colors } from '../../styling';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';

export const Outer = withStyles({
  root: {
    alignItems: 'center',
    background: Colors.white,
    display: 'flex',
    height: 48,
    position: 'relative',
    marginRight: 'auto',
    boxSizing: 'unset',
  },
})(CleanPaper);

export const IconBox = withStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    width: 56,
  },
})(CleanPaper);

export const StyledInput = withStyles({
  root: {
    border: 0,
    display: 'block',
    flex: 1,
    fontSize: 16,
    outline: 0,
  },
})(TextField);

export const HelpText = withStyles({
  root: {
    margin: '0 10px 0 10px',
    color: Colors.grey,
    fontSize: 12,
  },
})(Typography);
