import React from "react";
import { Box } from "@material-ui/core";
import moment, { Moment } from "moment";
import { GrepDate } from "../GrepDatePicker";
import { DatePickerProps } from "@material-ui/pickers/DatePicker/DatePicker";
import DatePicker from "../DatePicker";
import { getDateString } from "../../utils/dateHelper";

interface Props extends Pick<DatePickerProps, "disabled" | "style"> {
    from?: moment.MomentInput;
    to?: moment.MomentInput;
    onChange?: (date: GrepDate) => void;
}

export default ({ from, to, onChange, ...props }: Props) => {
    const [gyldigFra, setGyldigFra] = React.useState<Moment>(
        from ? moment(from) : null
    );
    const [gyldigTil, setGyldigTil] = React.useState<Moment>(
        to ? moment(to) : null
    );

    React.useMemo(() => {
        const hasChanged = !moment(from).isSame(gyldigFra);
        hasChanged && setGyldigFra(from ? moment(from) : null);
    }, [from]);

    React.useMemo(() => {
        const hasChanged = !moment(to).isSame(gyldigTil);
        hasChanged && setGyldigTil(to ? moment(to) : null);
    }, [to]);

    const dateValid = React.useMemo(() => {
        if (gyldigFra && gyldigTil) {
            return (
                gyldigFra.isValid() &&
                gyldigTil.isValid() &&
                gyldigFra <= gyldigTil
            );
        }
        if (gyldigFra) return gyldigFra.isValid();
        if (gyldigTil) return gyldigTil.isValid();
        return true;
    }, [gyldigFra, gyldigTil]);

    React.useMemo(() => {
        onChange &&
            onChange({
                value: getDateString(gyldigFra),
                value2: getDateString(gyldigTil),
                valid: dateValid
            });
    }, [gyldigFra, gyldigTil, dateValid]);

    return (
        <Box style={{ display: "flex" }}>
            <DatePicker
                {...props}
                label="Gyldig fra"
                style={{ marginRight: 25 }}
                value={gyldigFra}
                onChange={date => setGyldigFra(date)}
                maxDateMessage='Dato må være før "Gyldig til"'
                maxDate={gyldigTil ? gyldigTil : new Date("01/01/2200")}
            />
            <DatePicker
                {...props}
                label="Gyldig til"
                value={gyldigTil}
                onChange={date => setGyldigTil(date)}
                minDateMessage='Dato må være etter "Gyldig fra"'
                minDate={gyldigFra ? gyldigFra : new Date("01/01/1900")}
            />
        </Box>
    );
};
