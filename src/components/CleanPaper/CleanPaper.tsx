import * as React from 'react';
import { CleanedPaper } from './cleanPaperStyles';

export interface CleanPaperProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  elevation?: number;
  classes: {
    root: string;
  };
}

const CleanPaper: React.FC<CleanPaperProps> = (props) => (
  <CleanedPaper
    elevation={props.elevation ? props.elevation : 0}
    square
    style={props.style}
    className={props.classes.root}
    onClick={props.onClick}
  >
    {props.children}
  </CleanedPaper>
);

export default CleanPaper as React.ComponentType<CleanPaperProps>;
