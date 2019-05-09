import * as React from "react";
import Button from "@material-ui/core/Button";
import NavigateBackIcon from "@material-ui/icons/NavigateBefore";

interface INavigateBackProps {
    label: string;
    style?: React.CSSProperties;
    onClick: () => void;
}

const NavigateBack: React.FC<INavigateBackProps> = props => (
    <Button
        color="primary"
        style={{ marginTop: 10, ...props.style }}
        onClick={() => props.onClick()}
    >
        <NavigateBackIcon />
        {props.label}
    </Button>
);

export default NavigateBack as React.ComponentType<INavigateBackProps>;
