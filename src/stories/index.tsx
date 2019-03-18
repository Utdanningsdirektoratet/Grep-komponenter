import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
    MainLayout,
    AppBar,
    AppBarTop,
    CenterLayout,
    AppBarLogo,
    AppBarProfile,
    DropdownMenu,
    AppBarNavList,
    Footer,
    FooterItems
} from "..";
import { menuItems } from "../components/DropdownMenu/DropDownMenu.stories";
import { navbarPages } from "../components/AppBarNavList/AppBarNavList.stories";
import { footerItems } from "../components/Footer/Footer.stories";

storiesOf("Full dashboard", module).add("with content", () => (
    <MainLayout>
        <AppBar>
            <AppBarTop>
                <CenterLayout>
                    <AppBarLogo
                        title="Grepadmin"
                        environment="Test"
                        imageSrc="./logo.png"
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
        <CenterLayout>
            <p>Some content</p>
        </CenterLayout>
        <Footer>
            <CenterLayout>
                <FooterItems items={footerItems} />
            </CenterLayout>
        </Footer>
    </MainLayout>
));
