import moment, { Moment } from 'moment';

export const getDateString = (date: Moment) => {
  if (date) {
    const utcOffset = moment().utcOffset();
    date.set('hours', 0);
    return date.add(utcOffset, 'minutes').toISOString();
  }
  return null;
};
