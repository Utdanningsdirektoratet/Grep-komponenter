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
        value: "Best"
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
                onChange={action("select med feilmelding change")}
            />
            <GrepSelect
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
                selectItems={selectItems}
                onChange={action("select med hjelpetekst change")}
            />
            <GrepSelect
                label="Med kjempelang label bla bla bla"
                selectItems={selectItems}
                onChange={action("select med feilmelding change")}
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
                onChange={action("outlined-select med feilmelding change")}
            />
            <GrepSelect
                outlined
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
                selectItems={selectItems}
                onChange={action("outlined-select med hjelpetekst change")}
            />
            <GrepSelect
                outlined
                label="Med kjempelang label bla bla bla"
                selectItems={selectItems}
                onChange={action("outlined-select med lang-label change")}
            />
        </React.Fragment>
    ));
