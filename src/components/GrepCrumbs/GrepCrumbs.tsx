import React from 'react';
import { Container, Current } from './grepCrumbStyles';
import { Link, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export interface Breadcrumb {
  path?: string;
  label: string;
}

interface Props {
  style?: React.CSSProperties;
  breadcrumbs: Breadcrumb[];
  onClick?: (crumb: Breadcrumb) => void;
}

const GrepCrumbs: React.FC<Props> = ({
  style,
  onClick,
  breadcrumbs,
}: Props) => {
  const dispatch = useDispatch();

  const handleClick = (crumb: Breadcrumb): void => {
    if (onClick) {
      onClick(crumb);
    } else {
      crumb.path && dispatch(push(crumb.path));
    }
  };

  return (
    <Container style={style}>
      {breadcrumbs.map((crumb, index) =>
        crumb.path ? (
          <Box key={index} display="flex">
            <Link
              style={{ fontSize: 16 }}
              tabIndex={0}
              component="button"
              onClick={(): void => handleClick(crumb)}
            >
              {crumb.label}
            </Link>
            {index !== breadcrumbs.length - 1 && <Box margin="0 8px">&gt;</Box>}
          </Box>
        ) : (
          <Current key={index}>{crumb.label}</Current>
        ),
      )}
    </Container>
  );
};

export default GrepCrumbs;
