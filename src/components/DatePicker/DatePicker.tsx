import * as React from "react";
import {
    KeyboardDatePicker,
    KeyboardDatePickerProps,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Locale } from "moment";
import "moment/locale/nb";

export interface DatePickerProps extends KeyboardDatePickerProps {
    locale?: Locale;
}

export default ({ locale, ...props }: DatePickerProps) => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils} locale={locale || "nb"}>
            <KeyboardDatePicker
                {...props}
                clearable
                format="DD/MM/YYYY"
                style={{ ...props.style }}
                margin={props.margin || "normal"}
                inputVariant={props.inputVariant || "outlined"}
                invalidDateMessage={props.invalidDateMessage || "Ugyldig dato"}
            />
        </MuiPickersUtilsProvider>
    );
};
