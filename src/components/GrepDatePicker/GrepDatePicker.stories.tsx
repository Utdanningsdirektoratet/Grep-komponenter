import * as React from "react";
import { storiesOf } from "@storybook/react";
import CenterLayout from "../CenterLayout/CenterLayout";
import GrepDatePicker from "../GrepDatePicker/GrepDatePicker";

storiesOf("GrepDatePicker", module)
    .addDecorator(storyFn => (
        <CenterLayout
            style={{
                marginTop: 40,
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            {storyFn()}
        </CenterLayout>
    ))
    .add("Standard", () => (
        <React.Fragment>
            <GrepDatePicker
                label="Med feilmelding"
                errorMessage="Feilmelding"
            />
            <GrepDatePicker label="Med hjelpetekst" helperText="Hjelpetekst" />
            <GrepDatePicker
                label="Med default verdi"
                defaultValue="2019-04-25"
            />
        </React.Fragment>
    ))
    .add("Outlined", () => (
        <React.Fragment>
            <GrepDatePicker
                variant="outlined"
                label="Med feilmelding"
                errorMessage="Feilmelding"
            />
            <GrepDatePicker
                variant="outlined"
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
            />
            <GrepDatePicker
                variant="outlined"
                label="Med default verdi"
                defaultValue="2019-04-25"
            />
        </React.Fragment>
    ));
