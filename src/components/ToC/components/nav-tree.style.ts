import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      listStyle: 'none',
      padding: 0,
      '& ul': {
        fontSize: '.9em',
      },
    },
  });
});

export default useStyles;
