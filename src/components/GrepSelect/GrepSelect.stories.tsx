import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CenterLayout from "../CenterLayout/CenterLayout";
import GrepSelect, { ISelectItem } from "../GrepSelect/GrepSelect";

const selectItems: ISelectItem[] = [
    {
        value: "Test"
    },
    {
        value: "Best",
        label: "Custom label (value is Best)"
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
                value={"Test"}
                label="Med feilmelding"
                errorMessage="Feilmelding"
                selectItems={selectItems}
                onChange={action("select med feilmelding change")}
            />
            <GrepSelect
                value={"Test"}
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
                selectItems={selectItems}
                onChange={action("select med hjelpetekst change")}
            />
            <GrepSelect
                value={"Test"}
                label="Med kjempelang label bla bla bla"
                selectItems={selectItems}
                onChange={action("select med lang-label change")}
            />
        </React.Fragment>
    ))
    .add("Outlined", () => (
        <React.Fragment>
            <GrepSelect
                value={"Test"}
                outlined
                label="Med feilmelding"
                errorMessage="Feilmelding"
                selectItems={selectItems}
                onChange={action("outlined-select med feilmelding change")}
            />
            <GrepSelect
                value={"Test"}
                outlined
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
                selectItems={selectItems}
                onChange={action("outlined-select med hjelpetekst change")}
            />
            <GrepSelect
                value={"Test"}
                outlined
                label="Med kjempelang label bla bla bla"
                selectItems={selectItems}
                onChange={action("outlined-select med lang-label change")}
            />
        </React.Fragment>
    ));
