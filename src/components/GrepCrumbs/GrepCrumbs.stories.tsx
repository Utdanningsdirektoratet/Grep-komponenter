import * as React from "react";
import { storiesOf } from "@storybook/react";
import GrepCrumbs, { Breadcrumb } from "./GrepCrumbs";

export const breadcrumbs: Breadcrumb[] = [
    {
        label: "Driftsmeldinger",
        path: "/service-messages"
    },
    {
        label: "Administrer brukere",
        path: "/manage-users"
    }
];

storiesOf("GrepCrumbs", module).add("standard", () => (
    <GrepCrumbs
        breadcrumbs={breadcrumbs}
        onClick={page => console.log("clicked on ", page.label)}
    />
));
