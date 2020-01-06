import * as React from 'react';
import { Container, Current } from './grepCrumbStyles';
import { Link, Box } from '@material-ui/core';

export interface Breadcrumb {
  path: string;
  label: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  onClick: (crumb: Breadcrumb) => void;
}

const GrepCrumbs: React.FC<Props> = ({ breadcrumbs, onClick }) => (
  <Container>
    {breadcrumbs.map((crumb, index) =>
      index === breadcrumbs.length - 1 ? (
        <Current key={index}>{crumb.label}</Current>
      ) : (
        <Box key={index} display="flex">
          <Link
            style={{ fontSize: 16 }}
            tabIndex={0}
            component="button"
            onClick={() => onClick(crumb)}
          >
            {crumb.label}
          </Link>
          <Box margin="0 8px">&gt;</Box>
        </Box>
      ),
    )}
  </Container>
);

export default GrepCrumbs;
