import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MainLayout, AppBar, CenterLayout, AppBarNavList } from "..";

export const navbarPages = [
    {
        id: 1,
        label: "Hjem",
        onClick: (url: string) => console.log("going to url: ", url),
        toUrl: "/home"
    },
    {
        id: 2,
        label: "Læreplaner",
        onClick: (url: string) => console.log("going to url: ", url),
        toUrl: "/curriculums"
    },
    {
        id: 3,
        label: "Metadata",
        onClick: (url: string) => console.log("going to url: ", url),
        toUrl: "/metadata"
    },
    {
        id: 4,
        label: "Administrasjon",
        onClick: (url: string) => console.log("going to url: ", url),
        toUrl: "/admin"
    }
];

storiesOf("AppbarNavigationList", module).add("with theme and appbar", () => (
    <MainLayout>
        <AppBar>
            <CenterLayout>
                <AppBarNavList
                    pages={navbarPages}
                    selectedPage={navbarPages[0].id}
                    onChange={number => console.log("index: ", number)}
                />
            </CenterLayout>
        </AppBar>
    </MainLayout>
));
