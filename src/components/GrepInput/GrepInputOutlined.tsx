import * as React from "react";
import GrepInput, { GrepInputProps } from "./GrepInput";
interface Props extends GrepInputProps {}

const GrepInputOutlined: React.FC<Props> = props => (
    <GrepInput {...props} variant="outlined" />
);

export default GrepInputOutlined as React.ComponentType<Props>;
