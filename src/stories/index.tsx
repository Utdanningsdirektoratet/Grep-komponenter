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
    BodyLayout,
    ContainedLinkList
} from "..";
import { menuItems } from "../components/DropdownMenu/DropDownMenu.stories";
import { navbarPages } from "../components/AppBarNavList/AppBarNavList.stories";
import { footerItems } from "../components/Footer/Footer.stories";
import LinkList from "../components/LinkList";
import CurriculumTable from "../components/CurriculumTable";
import { adminPages } from "../components/LinkList/LinkList.stories";
import { curriculums } from "../components/CurriculumTable/CurriculumTable.stories";
import { tableColumns } from "../components/GrepTable/GrepTable.stories";
import { myPages } from "../components/ContainedLinkList/ContainedLinkList.stories";
import GrepCrumbs from "../components/GrepCrumbs";
import { breadcrumbs } from "../components/GrepCrumbs/GrepCrumbs.stories";
import { renderGDPRText } from "../components/GDPR/GDPR.stories";
import GDPR from "../components/GDPR";
import ProfileInfo from "../components/ProfileInfo";
import { user } from "../components/ProfileInfo/ProfileInfo.stories";

storiesOf("Pages", module)
    .addDecorator(storyFn => (
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
            <CenterLayout>{storyFn()}</CenterLayout>
            <Footer>
                <CenterLayout>
                    <FooterItems items={footerItems} />
                </CenterLayout>
            </Footer>
        </MainLayout>
    ))
    .add("Dashboard", () => (
        <BodyLayout>
            <ContainedLinkList
                title={"Mine tilganger"}
                pages={myPages}
                onPageClick={page => console.log("clicked on ", page.label)}
            />
            <CurriculumTable
                title={"Mine læreplaner"}
                columns={tableColumns}
                curriculums={curriculums}
                onCurriculumClick={id => console.log("clicked on ", id)}
            />
        </BodyLayout>
    ))
    .add("Admin", () => (
        <React.Fragment>
            <GrepCrumbs
                breadcrumbs={breadcrumbs}
                onClick={page => console.log("clicked on ", page.label)}
            />
            <BodyLayout>
                <LinkList
                    title={"Systemadministrasjon"}
                    pages={adminPages}
                    onPageClick={page => console.log("clicked on ", page.label)}
                />
            </BodyLayout>
        </React.Fragment>
    ))
    .add("My profile", () => (
        <BodyLayout>
            <ProfileInfo {...user} />
            <GDPR>{renderGDPRText()}</GDPR>
        </BodyLayout>
    ));
