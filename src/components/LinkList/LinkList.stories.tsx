import * as React from "react";
import { storiesOf } from "@storybook/react";
import LinkList, { IPageLink } from "./LinkList";
import Inbox from "@material-ui/icons/Inbox";
import Settings from "@material-ui/icons/Settings";
import Description from "@material-ui/icons/Description";

export const myPages: IPageLink[] = [
    {
        name: "Læreplaner",
        getLinkIcon: () => <Inbox color="primary" />
    },
    {
        name: "Metadata",
        redirectUrl: "test",
        getLinkIcon: () => <Description color="primary" />
    },
    {
        name: "Systemadministrasjon",
        getLinkIcon: () => <Settings color="primary" />
    }
];

storiesOf("LinkList", module).add("standard", () => (
    <LinkList
        title={"Mine tilganger"}
        pages={myPages}
        onPageClick={url => console.log("clicked on ", url)}
    />
));
