import * as React from "react";
import Close from "@material-ui/icons/Close";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { Colors } from "../../styling";

import { IconBox, HelpText, Outer, StyledInput } from "./searchBarStyles";

interface SearchBarProps {
    helpText?: string;
    outlined?: boolean;
    initValue?: string;
    placeholder?: string;
    searchAllText?: string;
    onClear: () => void;
    onSearchAll?: () => void;
    onInputChange: (value: string) => void;
}

interface SearchBarState {
    value: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    public clearButtonStyle = {
        cursor: "pointer"
    };

    constructor(props: SearchBarProps) {
        super(props);
        this.state = { value: props.initValue || "" };
    }

    public render() {
        const {
            helpText,
            placeholder,
            onSearchAll,
            searchAllText,
            outlined
        } = this.props;

        const { value } = this.state;

        return (
            <React.Fragment>
                <Outer
                    style={{
                        border: outlined ? `1px solid ${Colors.lightGrey}` : 0
                    }}
                >
                    <IconBox>
                        <Search />
                    </IconBox>
                    <StyledInput
                        value={value}
                        onChange={this._handleChange}
                        placeholder={placeholder}
                        InputProps={{ disableUnderline: true, fullWidth: true }}
                    />
                    <IconBox style={this.clearButtonStyle}>
                        {!!value.length && (
                            <Close onClick={this._handleClear} />
                        )}
                    </IconBox>
                </Outer>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {helpText && <HelpText>{helpText}</HelpText>}
                    {searchAllText && onSearchAll && (
                        <Button color="primary" onClick={onSearchAll}>
                            {searchAllText}
                        </Button>
                    )}
                </div>
            </React.Fragment>
        );
    }

    private _handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const newVal = event.target.value;
        this.setState({ value: newVal });
        this.props.onInputChange(newVal);
    };

    private _handleClear = () => {
        this.setState({ value: "" });
        this.props.onClear();
    };
}

export default SearchBar as React.ComponentType<SearchBarProps>;
