import * as React from "react";
import { storiesOf } from "@storybook/react";
import CenterLayout from "../CenterLayout/CenterLayout";
import GrepSelect, { ISelectItem } from "../GrepSelect/GrepSelect";

const selectItems: ISelectItem[] = [
    {
        label: "Test",
        value: 1
    }
];

storiesOf("GrepSelect", module)
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
            <GrepSelect
                label="Med feilmelding"
                errorMessage="Feilmelding"
                selectItems={selectItems}
            />
            <GrepSelect
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
                selectItems={selectItems}
            />
            <GrepSelect
                label="Med kjempelang label bla bla bla"
                selectItems={selectItems}
            />
        </React.Fragment>
    ))
    .add("Outlined", () => (
        <React.Fragment>
            <GrepSelect
                outlined
                label="Med feilmelding"
                errorMessage="Feilmelding"
                selectItems={selectItems}
            />
            <GrepSelect
                outlined
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
                selectItems={selectItems}
            />
            <GrepSelect
                outlined
                label="Med kjempelang label bla bla bla"
                selectItems={selectItems}
            />
        </React.Fragment>
    ));
