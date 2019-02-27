import * as React from "react";
import { AppBarProps as ComponentProps } from "./AppBar";

export interface AppBarProps extends ComponentProps {}

declare const AppBar: React.ComponentType<AppBarProps>;

export default AppBar;
