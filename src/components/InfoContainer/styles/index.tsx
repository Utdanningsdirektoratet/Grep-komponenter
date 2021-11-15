import * as React from 'react';
import { withStyles, Typography, Box } from '@material-ui/core';
import { Colors } from '../../../styling';

const StyledInfoKey = withStyles({
  root: {
    color: Colors.grey,
    marginRight: '2rem',
  },
})(Typography);

export const InfoKey: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <StyledInfoKey variant="body1" style={style}>
    {children}
  </StyledInfoKey>
);

const StyledInfoValue = withStyles({
  root: {},
})(Typography);

export const InfoValue: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <StyledInfoValue variant="body1" style={style}>
    {children}
  </StyledInfoValue>
);

const StyledInfoHeader = withStyles({
  root: {
    paddingBottom: 10,
  },
})(Typography);

export const InfoHeader: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <StyledInfoHeader variant="h6" style={style}>
    {children}
  </StyledInfoHeader>
);

export const InfoField = withStyles({
  root: {
    display: 'flex',
    marginRight: 20,
  },
})(Box);

export const Container = withStyles({
  root: {
    paddingTop: 20,
  },
})(Box);

export const HorizontalContainer = withStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})(Box);
