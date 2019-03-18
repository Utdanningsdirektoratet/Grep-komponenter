import * as React from "react";
import { storiesOf } from "@storybook/react";
import { IMenuItem, DropdownMenu } from "..";

export const menuItems: IMenuItem[] = [
    {
        label: "Test 1",
        handleClick: () => console.log("clicked ")
    },
    {
        label: "Test 2",
        disabled: true,
        handleClick: () => console.log("clicked ")
    },
    {
        label: "Test 3",
        handleClick: () => console.log("clicked ")
    }
];

storiesOf("DropdownMenu", module).add("standard", () => (
    <DropdownMenu
        menuOpen
        menuAnchor={null}
        menuItems={menuItems}
        onMenuClose={() => console.log("closing menu")}
    />
));
