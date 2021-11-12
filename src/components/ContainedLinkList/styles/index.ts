import { Colors } from '../../../styling';
import { Box, List, ListItem, Typography, withStyles } from '@material-ui/core';

export const Container = withStyles({
  root: {
    border: `1px solid ${Colors.lightGrey}`,
    height: 'fit-content',
    width: 'fit-content',
  },
})(Box);

export const Title = withStyles({
  root: {
    fontSize: 24,
    padding: 20,
    color: Colors.black,
    whiteSpace: 'nowrap',
  },
})(Typography);

export const StyledList = withStyles({
  root: {
    padding: 0,
  },
})(List);

export const StyledListItem = withStyles({})(ListItem);
