import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  cover: (props: { elevation?: boolean }) => ({
    background: '#f1f1f1',
    marginBottom: 12,
    padding: '10px 0',
    boxShadow: props.elevation
      ? `0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);`
      : 'none',
  }),
}));
