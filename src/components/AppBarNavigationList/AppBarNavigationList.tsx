import * as React from "react";
import {
  StyledList,
  StyledListItem,
  StyledListItemText
} from "./appbar-navigation-list-styles";

export interface NavigationProps {
  id: number;
  label: string;
  toUrl: string;
  onClick: (url: string) => void;
}

export interface AppBarNavigationListProps {
  selectedPage: number;
  pages: NavigationProps[];
}

interface State {}

class AppBarNavigationList extends React.Component<
  AppBarNavigationListProps,
  State
> {
  public render() {
    const { pages, selectedPage } = this.props;

    return (
      <StyledList>
        {pages.map(page => (
          <StyledListItem
            key={page.id}
            button
            onClick={() => page.onClick(page.toUrl)}
            selected={page.id === selectedPage}
          >
            <StyledListItemText primary={page.label} />
          </StyledListItem>
        ))}
      </StyledList>
    );
  }
}

export default AppBarNavigationList;
