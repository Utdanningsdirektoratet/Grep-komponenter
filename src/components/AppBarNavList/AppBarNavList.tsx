import * as React from 'react';
import { StyledTabs, StyledTab } from './appBarNavListStyles';

export interface NavigationProps {
  id: number;
  label: string;
  toUrl?: string;
  children?: NavigationProps[];
  linkIcon?: React.ReactElement<any>;
}

export interface AppBarNavListProps {
  selectedPage: number;
  pages: NavigationProps[];
  onChange: (selectedPage: number) => void;
}

const AppBarNavList: React.FC<AppBarNavListProps> = ({
  selectedPage,
  pages,
  onChange,
}) => {
  const [value, setValue] = React.useState(selectedPage);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <StyledTabs value={value} onChange={handleChange}>
      {pages.map(page => (
        <StyledTab key={page.id} label={page.label} />
      ))}
    </StyledTabs>
  );
};

export default AppBarNavList as React.ComponentType<AppBarNavListProps>;
