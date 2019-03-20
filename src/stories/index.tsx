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
    FooterItems,
    BodyLayout
} from "..";
import { menuItems } from "../components/DropdownMenu/DropDownMenu.stories";
import { navbarPages } from "../components/AppBarNavList/AppBarNavList.stories";
import { footerItems } from "../components/Footer/Footer.stories";
import LinkList from "../components/LinkList";
import CurriculumList from "../components/CurriculumList";
import { myPages } from "../components/LinkList/LinkList.stories";
import {
    curriculums,
    statuses
} from "../components/CurriculumList/CurriculumList.stories";

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
            <BodyLayout>
                <LinkList
                    title={"Mine tilganger"}
                    pages={myPages}
                    onPageClick={url => console.log("clicked on ", url)}
                />
                <CurriculumList
                    title={"Mine læreplaner"}
                    statuses={statuses}
                    curriculums={curriculums}
                    onCurriculumClick={id => console.log("clicked on ", id)}
                />
            </BodyLayout>
        </CenterLayout>
        <Footer>
            <CenterLayout>
                <FooterItems items={footerItems} />
            </CenterLayout>
        </Footer>
    </MainLayout>
));
