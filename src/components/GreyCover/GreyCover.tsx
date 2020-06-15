import * as React from 'react';
import { StyledGreyCover } from './greyCoverStyles';

export interface GreyCoverProps {
  elevation?: number;
}

const GreyCover: React.FC<GreyCoverProps> = (props) => (
  <StyledGreyCover elevation={props.elevation}>
    {props.children}
  </StyledGreyCover>
);

export default GreyCover as React.ComponentType<GreyCoverProps>;
