import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export interface IMenuItem {
    label: string;
    disabled?: boolean;
    handleClick: (id?: number | null) => void;
}
export interface DropdownMenuProps {
    menuOpen: boolean;
    contextId?: number | null;
    menuItems: IMenuItem[];
    menuAnchor: HTMLElement | null;
    onMenuClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = props => (
    <Menu
        open={props.menuOpen}
        anchorEl={props.menuAnchor}
        onClose={props.onMenuClose}
    >
        {props.menuItems.map((item, index) => (
            <MenuItem
                key={index}
                onClick={() => item.handleClick(props.contextId)}
            >
                {item.label}
            </MenuItem>
        ))}
    </Menu>
);

export default DropdownMenu as React.ComponentType<DropdownMenuProps>;
