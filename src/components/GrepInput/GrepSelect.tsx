import * as React from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {
    MenuItem,
    InputLabel,
    FormHelperText,
    Input,
    OutlinedInput,
    RootRef
} from "@material-ui/core";
import Select, { SelectProps } from "@material-ui/core/Select/Select";

export interface ISelectItem {
    label: string;
    value?: string | string[] | number;
}
export interface GrepSelectProps extends SelectProps {
    label: string;
    outlined?: boolean;
    helperText?: string;
    errorMessage?: string;
    selectItems: ISelectItem[];
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
            outlined,
            errorMessage,
            selectItems,
            label,
            helperText,
            ...rest
        } = this.props;

        return (
            <FormControl
                variant={outlined ? "outlined" : "standard"}
                error={typeof errorMessage !== "undefined"}
            >
                <RootRef rootRef={this.InputLabelRef}>
                    <InputLabel style={{ width: "max-content" }}>
                        {label}
                    </InputLabel>
                </RootRef>
                <Select
                    {...rest}
                    disabled={!selectItems}
                    value={this.props.value || 0}
                    style={{ minWidth: this.state.labelWidth }}
                    input={
                        outlined ? (
                            <OutlinedInput labelWidth={this.state.labelWidth} />
                        ) : (
                            <Input />
                        )
                    }
                >
                    <MenuItem value={0} disabled>
                        {this.props.placeholder}
                    </MenuItem>
                    {selectItems.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errorMessage || helperText}</FormHelperText>
            </FormControl>
        );
    }
}

export default GrepSelect as React.ComponentType<GrepSelectProps>;
