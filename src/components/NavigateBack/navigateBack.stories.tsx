import * as React from "react";
import { storiesOf } from "@storybook/react";
import NavigateBack from "./NavigateBack";

storiesOf("NavigateBack", module)
    .addDecorator(storyFn => (
        <div style={{ margin: "40px auto" }}>{storyFn()}</div>
    ))
    .add("Standard", () => (
        <React.Fragment>
            <NavigateBack
                label="Tilbake"
                onClick={() => console.log("go back")}
            />
        </React.Fragment>
    ));
