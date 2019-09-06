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

export interface IMenuItem<T extends object> extends MenuItemProps {
    label: string;
    children?: Array<IMenuItem<T>>;
    handleClick: (context?: T) => void;
}
export interface DropdownMenuProps<T extends object> {
    context?: T;
    menuOpen: boolean;
    menuItems: Array<IMenuItem<T>>;
    menuAnchor: HTMLElement | null;
    onMenuClose: () => void;
}

export default <T extends object>({
    menuAnchor,
    menuItems,
    menuOpen,
    context,
    ...props
}: DropdownMenuProps<T>) => {
    const [expandedItem, setExpandedItem] = React.useState<number | null>(null);

    const _renderChildren = (children: Array<IMenuItem<T>>, index: number) => (
        <Collapse in={expandedItem === index} timeout="auto" unmountOnExit>
            <List disablePadding>
                {children.map((child, cIndex) => {
                    const { style, button, handleClick, ...rest } = child;

                    return (
                        <MenuItem
                            {...rest}
                            key={cIndex}
                            style={{ paddingLeft: "50px" }}
                            onClick={() => _onItemClicked(index, cIndex)}
                        >
                            <ListItemText>{child.label}</ListItemText>
                        </MenuItem>
                    );
                })}
            </List>
        </Collapse>
    );

    const _renderExpandIcon = (index: number) => {
        return expandedItem === index ? <ExpandLess /> : <ExpandMore />;
    };

    const _onExpandItem = (index: number) => {
        const expanded = expandedItem === index;
        setExpandedItem(expanded ? null : index);
    };

    const _onItemClicked = (index: number, cIndex?: number) => {
        setExpandedItem(null);
        props.onMenuClose();

        if (cIndex != null) {
            menuItems[index].children![cIndex].handleClick(context);
        } else {
            menuItems[index].handleClick(context);
        }
    };

    const _onClose = () => {
        setExpandedItem(null);
        props.onMenuClose();
    };

    return (
        <Menu open={menuOpen} anchorEl={menuAnchor} onClose={_onClose}>
            {menuItems.map((item, index) => {
                const { children, button, handleClick, ...rest } = item;

                return (
                    <div key={index}>
                        <MenuItem
                            {...rest}
                            onClick={
                                children
                                    ? () => _onExpandItem(index)
                                    : () => _onItemClicked(index)
                            }
                        >
                            <ListItemText>{item.label}</ListItemText>
                            {children && _renderExpandIcon(index)}
                        </MenuItem>
                        {children && _renderChildren(children, index)}
                    </div>
                );
            })}
        </Menu>
    );
};
