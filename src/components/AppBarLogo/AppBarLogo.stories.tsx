import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AppBarLogo } from "..";

storiesOf("AppBarLogo", module).add("standard", () => (
    <AppBarLogo
        title="Grepadmin"
        environment="Test"
        imageSrc="./logo.png"
        imageAlt={"logo.png"}
    />
));
