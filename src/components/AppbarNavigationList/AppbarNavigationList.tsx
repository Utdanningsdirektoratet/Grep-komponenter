import * as React from "react";
import {
  StyledList,
  StyledListItem,
  StyledListItemText
} from "./appbar-navigation-list-styles";

interface Page {
  id: number;
  label: string;
  toUrl: string;
  onClick: (url: string) => void;
}

interface Props {
  selectedPage: number;
  pages: Page[];
}

interface State {}

class AppBarNavigationList extends React.Component<Props, State> {
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
