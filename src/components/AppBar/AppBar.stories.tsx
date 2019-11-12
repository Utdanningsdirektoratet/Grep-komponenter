import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
    MainLayout,
    CenterLayout,
    AppBarProfile,
    DropdownMenu,
    AppBarNavList,
    AppBar
} from "..";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { menuItems } from "../DropdownMenu/DropDownMenu.stories";
import { navbarPages } from "../AppBarNavList/AppBarNavList.stories";

storiesOf("AppBar", module).add("with content", () => (
    <MainLayout>
        {/* <CenterLayout> */}
        <div>
            <AppBar>
                <div style={{ display: "flex" }}>
                    <AppBarNavList
                        pages={navbarPages}
                        selectedPage={navbarPages[0].id}
                        onChange={number => console.log("index: ", number)}
                    />
                </div>
                <div style={{ display: "flex", marginLeft: "auto" }}>
                    <AppBarProfile
                        userRole={"Superbruker"}
                        fullName={"Grep Fagansvarlig"}
                        onButtonClick={() => console.log("Button clicked")}
                    />
                    <DropdownMenu
                        menuOpen={false}
                        menuAnchor={null}
                        menuItems={menuItems}
                        onMenuClose={() => console.log("closing menu")}
                    />
                </div>
            </AppBar>
        </div>

        {/* </CenterLayout> */}
    </MainLayout>
));

storiesOf("AppBar", module).add("hide/show on scroll", () => (
    <MainLayout>
        <CenterLayout>
            <div style={{ maxWidth: 900 }}>
                <AppBar>
                    <AppBarNavList
                        pages={navbarPages}
                        selectedPage={navbarPages[0].id}
                        onChange={number => console.log("index: ", number)}
                    />
                </AppBar>
                <Container>
                    <Box my={2}>
                        {[...new Array(30)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                            )
                            .join("\n")}
                    </Box>
                </Container>
            </div>
        </CenterLayout>
    </MainLayout>
));
