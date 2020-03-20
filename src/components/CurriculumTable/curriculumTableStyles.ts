import Colors from '../../styling/Colors';
import CleanPaper from '../CleanPaper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';

export const Container = withStyles({
  root: {
    border: `1px solid ${Colors.lightGrey}`,
    height: 'fit-content',
    flex: 'auto'
  },
})(CleanPaper);

export const Title = withStyles({
  root: {
    fontSize: 24,
    padding: 20,
    color: Colors.black,
  },
})(Typography);
