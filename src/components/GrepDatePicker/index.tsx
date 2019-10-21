import * as React from "react";
import moment, { Moment } from "moment";
import DatePicker, { DatePickerProps } from "../DatePicker";
import { getDateString } from "../../utils/dateHelper";

export type GrepDate = {
    valid: boolean;
    value: string;
    value2?: string;
};

interface Props extends Omit<DatePickerProps, "value" | "onChange"> {
    initialDate?: moment.MomentInput;
    onChange?: (date: GrepDate) => void;
    validate?: (date: Moment) => boolean;
}

export default ({
    label,
    onChange,
    initialDate,
    validate = (d: Moment) => (d ? d.isValid() : true),
    ...props
}: Props) => {
    const [date, setDate] = React.useState<Moment>(
        initialDate ? moment(initialDate) : null
    );

    const handleDate = (d: Moment) => {
        setDate(d);

        onChange &&
            onChange({
                valid: validate(d),
                value: getDateString(d)
            });
    };

    return (
        <DatePicker
            {...props}
            label={label}
            value={date}
            onChange={handleDate}
        />
    );
};
