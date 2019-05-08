import * as React from "react";
import Input from "@material-ui/core/Input/Input";
import RootRef from "@material-ui/core/RootRef/RootRef";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select, { SelectProps } from "@material-ui/core/Select/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import { PropTypes } from "@material-ui/core";

export interface ISelectItem {
    value: string;
    label?: string;
}
export interface GrepSelectProps extends SelectProps {
    label: string;
    outlined?: boolean;
    helperText?: string;
    errorMessage?: string;
    selectItems: ISelectItem[];
    formMargin?: PropTypes.Margin;
}

interface LocalState {
    labelWidth: number;
}

class GrepSelect extends React.Component<GrepSelectProps, LocalState> {
    private InputLabelRef = React.createRef<HTMLElement>();

    constructor(props: GrepSelectProps) {
        super(props);
        this.state = { labelWidth: 0 };
    }

    public componentDidMount() {
        this.setState({
            labelWidth: this.InputLabelRef.current!.offsetWidth
        });
    }

    public render() {
        const {
            errorMessage,
            selectItems,
            helperText,
            fullWidth,
            outlined,
            label,
            formMargin,
            value,
            ...rest
        } = this.props;

        const error = errorMessage ? errorMessage.length > 0 : false;

        return (
            <FormControl
                variant={outlined ? "outlined" : "standard"}
                fullWidth={fullWidth}
                error={error}
                margin={formMargin ? formMargin : "normal"}
                style={this.props.style}
            >
                <RootRef rootRef={this.InputLabelRef}>
                    <InputLabel style={{ width: "max-content" }}>
                        {label}
                    </InputLabel>
                </RootRef>
                <Select
                    {...rest}
                    disabled={!selectItems}
                    value={value === null ? "" : value}
                    style={{
                        minWidth: this.state.labelWidth + (outlined ? 35 : 25)
                    }}
                    input={
                        outlined ? (
                            <OutlinedInput labelWidth={this.state.labelWidth} />
                        ) : (
                            <Input />
                        )
                    }
                >
                    {selectItems.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                            {item.label ? item.label : item.value}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errorMessage || helperText}</FormHelperText>
            </FormControl>
        );
    }
}

export default GrepSelect as React.ComponentType<GrepSelectProps>;
