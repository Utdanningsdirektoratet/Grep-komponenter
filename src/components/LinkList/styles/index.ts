import { Colors } from '../../../styling';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';

export const Title = withStyles({
  root: {
    fontSize: 24,
    color: Colors.black,
    marginBottom: 20,
  },
})(Typography);
