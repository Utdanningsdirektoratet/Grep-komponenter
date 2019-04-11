import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MainLayout, CenterLayout, GreyCover, SearchBar } from "..";

storiesOf("GreyCover", module).add("GreyCover with content", () => (
    <MainLayout>
        <GreyCover>
            <CenterLayout>
                <SearchBar
                    onClear={() => void 0}
                    onInputChange={() => void 0}
                />
            </CenterLayout>
        </GreyCover>
    </MainLayout>
));
