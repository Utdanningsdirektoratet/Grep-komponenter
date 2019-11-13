import * as React from 'react';
import moment, { Moment } from 'moment';
import DatePicker, { DatePickerProps } from '../DatePicker';
import { getDateString } from '../../utils/dateHelper';

export type GrepDate = {
  valid: boolean;
  value: string;
};

interface Props extends Omit<DatePickerProps, 'value' | 'onChange'> {
  initialDate?: moment.MomentInput;
  override?: moment.MomentInput;
  onChange?: (date: GrepDate) => void;
  validate?: (date: Moment) => boolean;
}

export const GrepDatePicker: React.FC<Props> = ({
  maxDate,
  minDate,
  override,
  onChange,
  initialDate,
  validate = (d: Moment) => (d ? d.isValid() : true),
  ...props
}: Props) => {
  const [date, setDate] = React.useState<Moment>();

  const handleDate = (d: Moment) => {
    setDate(d);

    onChange &&
      onChange({
        valid: validate(d),
        value: getDateString(d),
      });
  };

  React.useEffect(() => {
    if (initialDate) {
      handleDate(moment(initialDate));
    }
  }, []);

  React.useMemo(() => {
    handleDate(override ? moment(override) : null);
  }, [override]);

  return (
    <DatePicker
      {...props}
      value={date}
      onChange={handleDate}
      {...{ maxDate, minDate }}
    />
  );
};

export default GrepDatePicker;
