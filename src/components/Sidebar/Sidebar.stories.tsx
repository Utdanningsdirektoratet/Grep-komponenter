import * as React from "react";
import Sidebar from "./Sidebar";
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

storiesOf("Sidebar", module).add("standard", () => (
    <Sidebar
        pages={adminPages}
        onPageClick={page => console.log("clicked on ", page.label)}
    />
));
