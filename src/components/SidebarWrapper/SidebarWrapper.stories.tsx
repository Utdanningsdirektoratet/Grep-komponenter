import * as React from "react";
import SidebarWrapper from "./SidebarWrapper";
import { storiesOf } from "@storybook/react";
import { NavigationProps } from "../AppBarNavList";

export const adminPages: NavigationProps[] = [
    {
        id: 1,
        label: "Driftsmeldinger",
        toUrl: "/service-messages"
    },
    {
        id: 2,
        label: "Administrer brukere",
        toUrl: "/manage-users"
    }
];

storiesOf("SidebarWrapper", module).add("standard", () => (
    <SidebarWrapper
        pages={adminPages}
        onPageClick={page => console.log("clicked on ", page.label)}
    >
        <div
            style={{
                height: "100%",
                width: 1050,
                background: "lightGrey"
            }}
        >
            Content goes here
        </div>
    </SidebarWrapper>
));
