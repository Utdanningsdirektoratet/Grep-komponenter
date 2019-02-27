import * as React from "react";
import {
  AppBarNavigationListProps as ComponentProps,
  NavigationProps as PageProps
} from "./AppBarNavigationList";

export interface AppBarNavigationListProps extends ComponentProps {}
export interface NavigationProps extends PageProps {}

declare const AppBarNavigation: React.ComponentType<AppBarNavigationListProps>;

export default AppBarNavigation;
