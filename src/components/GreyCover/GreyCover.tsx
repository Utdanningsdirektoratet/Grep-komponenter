import * as React from "react";
import { StyledGreyCover } from "./greyCoverStyles";

export interface GreyCoverProps {}

const GreyCover: React.FC<GreyCoverProps> = props => (
    <StyledGreyCover>{props.children}</StyledGreyCover>
);

export default GreyCover as React.ComponentType<GreyCoverProps>;
