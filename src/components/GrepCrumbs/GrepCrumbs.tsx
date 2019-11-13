import * as React from 'react';
import {
  Container,
  PreviousContainer,
  Previous,
  CrumbSign,
  Current,
} from './grepCrumbStyles';

export interface Breadcrumb {
  path: string;
  label: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  onClick: (crumb: Breadcrumb) => void;
}

const GrepCrumbs: React.FC<Props> = props => {
  return (
    <Container>
      {props.breadcrumbs.map((crumb, index) =>
        index === props.breadcrumbs.length - 1 ? (
          <Current key={crumb.path}>{crumb.label}</Current>
        ) : (
          <PreviousContainer key={crumb.path}>
            <Previous onClick={() => props.onClick(crumb)}>
              {crumb.label}
            </Previous>
            <CrumbSign>&gt;</CrumbSign>
          </PreviousContainer>
        ),
      )}
    </Container>
  );
};

export default GrepCrumbs as React.ComponentType<Props>;
