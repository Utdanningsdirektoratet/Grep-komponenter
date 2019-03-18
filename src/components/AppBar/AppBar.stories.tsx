import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
    MainLayout,
    AppBarTop,
    CenterLayout,
    AppBarLogo,
    AppBarProfile,
    DropdownMenu,
    AppBarNavList,
    AppBar
} from "..";
import { menuItems } from "../DropdownMenu/DropDownMenu.stories";
import { navbarPages } from "../AppBarNavList/AppBarNavList.stories";

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
                    pages={navbarPages}
                    selectedPage={navbarPages[0].id}
                    onChange={number => console.log("index: ", number)}
                />
            </CenterLayout>
        </AppBar>
    </MainLayout>
));
