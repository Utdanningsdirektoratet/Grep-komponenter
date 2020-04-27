import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      fontSize: 18,
      overflowY: 'scroll',
    },
  });
});
