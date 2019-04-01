import * as React from "react";
import { storiesOf } from "@storybook/react";
import LinkList from "./LinkList";
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

storiesOf("LinkList", module).add("standard", () => (
    <LinkList
        pages={adminPages}
        title={"Systemadministrasjon"}
        onPageClick={page => console.log("clicked on ", page.label)}
    />
));
