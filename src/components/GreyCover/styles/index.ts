import { makeStyles } from '../../../styling';

export const useStyles = makeStyles<{ elevation?: boolean }>()(
  (theme, { elevation }) => ({
    cover: {
      background: theme.palette.grey.A200,
      marginBottom: 12,
      padding: '10px 0',
      boxShadow: elevation
        ? `0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);`
        : 'none',
    },
  }),
);
