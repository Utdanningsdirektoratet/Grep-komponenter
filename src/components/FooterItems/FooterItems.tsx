import * as React from "react";
import {
    StyledFooter,
    StyledFooterItem,
    StyledFooterItemText
} from "./footerItemsStyles";

export interface FooterItem {
    label: string;
    onClickItem?: (args?: any) => any;
}
export interface FooterItemsProps {
    items: FooterItem[];
}

const FooterItems: React.FC<FooterItemsProps> = props => (
    <StyledFooter>
        {props.items.map((item, index) => (
            <StyledFooterItem
                key={index}
                onClick={item.onClickItem}
                button={typeof item.onClickItem === "function"}
            >
                <StyledFooterItemText primary={item.label} />
            </StyledFooterItem>
        ))}
    </StyledFooter>
);

export default FooterItems as React.ComponentType<FooterItemsProps>;
