import * as React from "react";
import {
    Menu,
    MenuItem,
    Collapse,
    List,
    ListItemText
} from "@material-ui/core";
import { MenuItemProps } from "@material-ui/core/MenuItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

export interface IMenuItem extends MenuItemProps {
    label: string;
    children?: IMenuItem[];
    handleClick: (id?: number | null) => void;
}
export interface DropdownMenuProps {
    menuOpen: boolean;
    contextId?: number | null;
    menuItems: IMenuItem[];
    menuAnchor: HTMLElement | null;
    onMenuClose: () => void;
}

interface ILocalState {
    expandedItem: number | null;
}

class DropdownMenu extends React.Component<DropdownMenuProps, ILocalState> {
    constructor(props: DropdownMenuProps) {
        super(props);

        this.state = { expandedItem: null };
    }

    public render() {
        const { menuAnchor, menuItems, menuOpen } = this.props;

        return (
            <Menu open={menuOpen} anchorEl={menuAnchor} onClose={this._onClose}>
                {menuItems.map((item, index) => {
                    const { children, button, ...rest } = item;

                    return (
                        <div key={index}>
                            <MenuItem
                                {...rest}
                                onClick={
                                    children
                                        ? () => this._onExpandItem(index)
                                        : () => this._onItemClicked(index)
                                }
                            >
                                <ListItemText>{item.label}</ListItemText>
                                {children && this._renderExpandIcon(index)}
                            </MenuItem>
                            {children && this._renderChildren(children, index)}
                        </div>
                    );
                })}
            </Menu>
        );
    }

    private _renderChildren = (children: IMenuItem[], index: number) => {
        return (
            <Collapse
                in={this.state.expandedItem === index}
                timeout="auto"
                unmountOnExit
            >
                <List disablePadding>
                    {children.map((child, cIndex) => {
                        const { style, button, ...rest } = child;

                        return (
                            <MenuItem
                                {...rest}
                                key={cIndex}
                                style={{ paddingLeft: "50px" }}
                                onClick={() =>
                                    this._onItemClicked(index, cIndex)
                                }
                            >
                                <ListItemText>{child.label}</ListItemText>
                            </MenuItem>
                        );
                    })}
                </List>
            </Collapse>
        );
    };

    private _renderExpandIcon = (index: number) => {
        return this.state.expandedItem === index ? (
            <ExpandLess />
        ) : (
            <ExpandMore />
        );
    };

    private _onExpandItem = (index: number) => {
        const expanded = this.state.expandedItem === index;
        this.setState({ expandedItem: expanded ? null : index });
    };

    private _onItemClicked = (index: number, cIndex?: number) => {
        const { onMenuClose, menuItems, contextId } = this.props;
        this.setState({ expandedItem: null });
        onMenuClose();

        if (cIndex != null) {
            menuItems[index].children![cIndex].handleClick(contextId);
        } else {
            menuItems[index].handleClick(contextId);
        }
    };

    private _onClose = () => {
        this.setState({ expandedItem: null });
        this.props.onMenuClose();
    };
}

export default DropdownMenu as React.ComponentType<DropdownMenuProps>;
