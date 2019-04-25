import * as React from "react";
import GrepDatePicker, { GrepDatePickerProps } from "./GrepDatePicker";
interface Props extends GrepDatePickerProps {}

const GrepDatePickerOutlined: React.FC<Props> = props => (
    <GrepDatePicker {...props} variant="outlined" />
);

export default GrepDatePickerOutlined as React.ComponentType<Props>;
