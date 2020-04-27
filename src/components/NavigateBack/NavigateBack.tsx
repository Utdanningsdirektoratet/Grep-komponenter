import * as React from 'react';
import Button from '@material-ui/core/Button';
import NavigateBackIcon from '@material-ui/icons/NavigateBefore';

interface NavigateBackProps {
  label: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

const NavigateBack: React.FC<NavigateBackProps> = (props) => (
  <Button
    color="primary"
    style={{ marginTop: 10, ...props.style }}
    onClick={() => props.onClick()}
  >
    <NavigateBackIcon />
    {props.label}
  </Button>
);

export default NavigateBack as React.ComponentType<NavigateBackProps>;
