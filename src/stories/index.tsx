import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { Button, Welcome } from "@storybook/react/demo";

import AppBar from "../components/AppBar";
import AppBarLogo from "../components/AppBarLogo";
import AppBarProfile from "../components/AppBarProfile";
import AppBarNavList from "../components/AppBarNavList";
import MainLayout from "../components/MainLayout";
import CenterLayout from "../components/CenterLayout";
import AppBarTop from "../components/AppBarTop/AppBarTop";
import DropdownMenu, {
    IMenuItem
} from "../components/DropdownMenu/DropdownMenu";
import Footer from "../components/Footer/Footer";
import FooterItems, { FooterItem } from "../components/FooterItems/FooterItems";

// import logo from "../../playground/public/logo.png";

storiesOf("Welcome", module).add("to Storybook", () => (
    <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
    .add("with text", () => (
        <Button onClick={action("clicked")}>Hello Button</Button>
    ))
    .add("with some emoji", () => (
        <Button onClick={action("clicked")}>
            <span role="img" aria-label="so cool">
                😀 😎 👍 💯
            </span>
        </Button>
    ));

storiesOf("AppBar", module).add("with content", () => (
    <MainLayout>
        <AppBar>
            <AppBarTop>
                <CenterLayout>
                    <AppBarLogo
                        title="Grepadmin"
                        environment="Test"
                        imageSrc="../../playground/public/logo.png"
                        imageAlt={""}
                    />
                    <AppBarProfile
                        role={"Superbruker"}
                        fullName={"Grep Fagansvarlig"}
                        onButtonClick={() => console.log("Button clicked")}
                    />
                    <DropdownMenu
                        menuOpen={false}
                        menuAnchor={null}
                        menuItems={menuItems}
                        onMenuClose={() => console.log("closing menu")}
                    />
                </CenterLayout>
            </AppBarTop>
            <CenterLayout>
                <AppBarNavList
                    pages={pages}
                    selectedPage={pages[0].id}
                    onChange={number => console.log("index: ", number)}
                />
            </CenterLayout>
        </AppBar>
        <CenterLayout>
            <p>Some content</p>
        </CenterLayout>
    </MainLayout>
));

storiesOf("AppBarLogo", module).add("standard", () => (
    <AppBarLogo
        title="Grepadmin"
        environment="Test"
        imageSrc="../../playground/public/logo.png"
        imageAlt={"logo.alt"}
    />
));

storiesOf("AppBarProfile", module).add("standard", () => (
    <AppBarProfile
        role={"Superbruker"}
        fullName={"Grep Fagansvarlig"}
        onButtonClick={() => console.log("Button clicked")}
    />
));

const menuItems: IMenuItem[] = [
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

const pages = [
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
                    pages={pages}
                    selectedPage={pages[0].id}
                    onChange={number => console.log("index: ", number)}
                />
            </CenterLayout>
        </AppBar>
    </MainLayout>
));

storiesOf("MainLayout", module).add("MainLayout with content", () => (
    <MainLayout>
        <div style={{ height: 500, width: 1500, backgroundColor: "grey" }} />
    </MainLayout>
));

storiesOf("CenterLayout", module).add("CenterLayout with content", () => (
    <MainLayout>
        <CenterLayout>
            <div
                style={{
                    display: "flex",
                    height: 500,
                    width: 2000,
                    backgroundColor: "grey"
                }}
            />
        </CenterLayout>
    </MainLayout>
));

const footerItems: FooterItem[] = [
    {
        label: "© 2018 Utdanningsdirektoratet. Alle rettigheter forbeholdt."
    },
    {
        label: "Versjon 0.0.35"
    },
    {
        label: "Personvern",
        onClickItem: () => console.log("test")
    },
    {
        label: "Kontakt",
        onClickItem: () => console.log("test")
    }
];

storiesOf("Footer", module).add("Footer with content", () => (
    <MainLayout>
        <Footer>
            <CenterLayout>
                <FooterItems items={footerItems} />
            </CenterLayout>
        </Footer>
    </MainLayout>
));
