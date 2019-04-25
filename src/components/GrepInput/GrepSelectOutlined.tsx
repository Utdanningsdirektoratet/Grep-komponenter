import * as React from "react";
import GrepSelect, { GrepSelectProps } from "./GrepSelect";
interface Props extends GrepSelectProps {}

const GrepSelectOutlined: React.FC<Props> = props => (
    <GrepSelect {...props} outlined />
);

export default GrepSelectOutlined as React.ComponentType<Props>;
