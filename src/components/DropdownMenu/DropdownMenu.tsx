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

class DropdownMenu extends React.Component<DropdownMenuProps> {
    public render() {
        const { menuAnchor, menuItems, menuOpen, onMenuClose } = this.props;

        return (
            <Menu open={menuOpen} anchorEl={menuAnchor} onClose={onMenuClose}>
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        disabled={item.disabled}
                        onClick={() => this._onItemClicked(index)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        );
    }

    private _onItemClicked = (index: number) => {
        const { onMenuClose, menuItems, contextId } = this.props;
        onMenuClose();
        menuItems[index].handleClick(contextId);
    };
}

export default DropdownMenu as React.ComponentType<DropdownMenuProps>;
