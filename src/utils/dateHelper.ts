import moment, { Moment } from "moment";

export const getDateString = (date: Moment) => {
    if (date) {
        const utcOffset = moment().utcOffset();
        return date.add(utcOffset, "minutes").toISOString();
    }
    return "";
};
