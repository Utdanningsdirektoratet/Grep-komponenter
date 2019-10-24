import React from "react";
import { Box } from "@material-ui/core";
import moment from "moment";
import { DatePickerProps } from "../DatePicker";
import GrepDatePicker, { GrepDate } from "../GrepDatePicker";

interface Props extends Omit<DatePickerProps, "value" | "onChange"> {
    fromLabel: string;
    toLabel: string;
    override?: DateRange;
    onChange: (date: DateRange) => void;
}

export type DateRange = {
    fromDate: string;
    toDate: string;
    valid?: boolean;
};

export default ({
    fromLabel,
    toLabel,
    onChange,
    override,
    ...props
}: Props) => {
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");
    const [fromDateValid, setFromDateValid] = React.useState(true);
    const [toDateValid, setToDateValid] = React.useState(true);

    const maxDate = toDate ? moment(toDate) : new Date("01/01/2200");
    const minDate = fromDate ? moment(fromDate) : new Date("01/01/1900");

    const handleFromDate = ({ value, valid }: GrepDate) => {
        setFromDate(value);
        setFromDateValid(valid);
    };

    const handleToDate = ({ value, valid }: GrepDate) => {
        setToDate(value);
        setToDateValid(valid);
    };

    React.useMemo(() => {
        let valid = fromDateValid && toDateValid;

        if (valid) {
            const from = fromDate ? moment(fromDate) : null;
            const to = toDate ? moment(toDate) : null;

            const fromValid = from ? from.diff(maxDate, "days") < 1 : true;
            const toValid = to ? to.diff(minDate, "days") > -1 : true;

            valid = fromValid && toValid;
        }

        onChange({ fromDate, toDate, valid });
    }, [fromDate, toDate]);

    return (
        <Box>
            <GrepDatePicker
                {...props}
                label={fromLabel}
                onChange={handleFromDate}
                override={override && override.fromDate}
                maxDateMessage={`Dato må være før "${toLabel}"`}
                maxDate={maxDate}
                style={{ marginRight: 25 }}
            />
            <GrepDatePicker
                {...props}
                label={toLabel}
                onChange={handleToDate}
                override={override && override.toDate}
                minDateMessage={`Dato må være etter "${fromLabel}"`}
                minDate={minDate}
            />
        </Box>
    );
};
