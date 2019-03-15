import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export interface IMenuItem {
    label: string;
    disabled?: boolean;
    handleClick: (payload: any) => any;
}
export interface DropdownMenuProps {
    menuOpen: boolean;
    menuItems: IMenuItem[];
    menuAnchor: HTMLAnchorElement | null;
    onMenuClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = props => (
    <Menu
        open={props.menuOpen}
        anchorEl={props.menuAnchor}
        onClose={props.onMenuClose}
    >
        {props.menuItems.map(item => (
            <MenuItem onClick={item.handleClick}>{item.label}</MenuItem>
        ))}
    </Menu>
);

export default DropdownMenu as React.ComponentType<DropdownMenuProps>;
