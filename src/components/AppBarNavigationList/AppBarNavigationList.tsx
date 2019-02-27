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
}

export interface AppBarNavigationListProps {
  selectedPage: number;
  pages: NavigationProps[];
  onChange: (selectedPage: number) => void;
}

interface State {
  selectedPage: number;
}

class AppBarNavigationList extends React.Component<
  AppBarNavigationListProps,
  State
> {
  state: Readonly<State> = {
    selectedPage: 0
  };

  public componentDidMount() {
    this.setState({ selectedPage: this.props.selectedPage });
  }

  public render() {
    const { pages } = this.props;

    return (
      <StyledList>
        {pages.map(page => (
          <StyledListItem
            key={page.id}
            button
            onClick={() => this._onClick(page)}
            selected={page.id === this.state.selectedPage}
          >
            <StyledListItemText primary={page.label} />
          </StyledListItem>
        ))}
      </StyledList>
    );
  }

  private _onClick = (page: NavigationProps) => {
    this.setState({ selectedPage: page.id });
    this.props.onChange(page.id);
  };
}

export default AppBarNavigationList as React.ComponentType<
  AppBarNavigationListProps
>;
