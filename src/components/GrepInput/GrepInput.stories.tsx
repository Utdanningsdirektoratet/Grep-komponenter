import * as React from "react";
import { storiesOf } from "@storybook/react";
import GrepInputOutlined from "./GrepInputOutlined";
import CenterLayout from "../CenterLayout/CenterLayout";
import GrepInput from "./GrepInput";
import GrepSelect, { ISelectItem } from "./GrepSelect";
import GrepSelectOutlined from "./GrepSelectOutlined";
import GrepDatePicker from "./GrepDatePicker";
import GrepDatePickerOutlined from "./GrepDatePickerOutlined";

const selectItems: ISelectItem[] = [
    {
        label: "Test",
        value: 1
    }
];

storiesOf("GrepInput", module)
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
    .add("Input", () => (
        <React.Fragment>
            <GrepInput label="Med feilmelding" errorMessage="Feilmelding" />
            <GrepInput label="Med hjelpetekst" helperText="Hjelpetekst" />
            <GrepInput label="Med placeholder" placeholder="Placeholder" />
            <GrepInput
                label="Multiline"
                placeholder="Placeholder"
                multiline
                rows="4"
            />
        </React.Fragment>
    ))
    .add("InputOutlined", () => (
        <React.Fragment>
            <GrepInputOutlined
                label="Med feilmelding"
                errorMessage="Feilmelding"
            />
            <GrepInputOutlined
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
            />
            <GrepInputOutlined
                label="Med placeholder"
                placeholder="Placeholder"
            />
            <GrepInputOutlined
                label="Multiline"
                placeholder="Placeholder"
                multiline
                rows="4"
            />
        </React.Fragment>
    ))
    .add("Select", () => (
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
                label="Med placeholder"
                placeholder="Placeholder"
                selectItems={selectItems}
            />
        </React.Fragment>
    ))
    .add("SelectOutlined", () => (
        <React.Fragment>
            <GrepSelectOutlined
                label="Med feilmelding"
                errorMessage="Feilmelding"
                selectItems={selectItems}
            />
            <GrepSelectOutlined
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
                selectItems={selectItems}
            />
            <GrepSelectOutlined
                label="Med placeholder"
                placeholder="Placeholder"
                selectItems={selectItems}
            />
        </React.Fragment>
    ))
    .add("DatePicker", () => (
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
    .add("DatePickerOutlined", () => (
        <React.Fragment>
            <GrepDatePickerOutlined
                label="Med feilmelding"
                errorMessage="Feilmelding"
            />
            <GrepDatePickerOutlined
                label="Med hjelpetekst"
                helperText="Hjelpetekst"
            />
            <GrepDatePickerOutlined
                label="Med default verdi"
                defaultValue="2019-04-25"
            />
        </React.Fragment>
    ));
