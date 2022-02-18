import * as React from 'react';
import { Tab, Tabs } from '@mui/material';

import { useStyles } from './styles';
import MobileAppBarNavList from './MobileAppBarNavList';

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
  const { classes } = useStyles();

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <Tabs
        classes={{ root: classes.tabs, indicator: classes.indicator }}
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ children: <div /> }}
      >
        {pages.map((page) => (
          <Tab
            disableTouchRipple
            className={classes.tab}
            key={page.id}
            label={page.label}
          />
        ))}
      </Tabs>
      <MobileAppBarNavList pages={pages} />
    </>
  );
};

export default AppBarNavList as React.ComponentType<AppBarNavListProps>;
