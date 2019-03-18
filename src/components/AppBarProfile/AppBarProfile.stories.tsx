import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AppBarProfile } from "..";

storiesOf("AppBarProfile", module).add("standard", () => (
    <AppBarProfile
        role={"Superbruker"}
        fullName={"Grep Fagansvarlig"}
        onButtonClick={() => console.log("Button clicked")}
    />
));
