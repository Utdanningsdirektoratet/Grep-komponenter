import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MainLayout, CenterLayout } from "..";

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
