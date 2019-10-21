import { Moment } from "moment";

export const getDateString = (date: Moment) =>
    date ? date.toISOString(true) : "";
