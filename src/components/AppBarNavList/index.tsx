import * as React from 'react';
import { Tab, Tabs } from '@mui/material';
import MobileAppBarNavList from './MobileAppBarNavList';
import classes from './styles/appbarNavList.module.css';

export interface NavigationProps {
  id: number;
  label: string;
  toUrl?: string;
  children?: NavigationProps[];
  linkIcon?: React.ReactElement<unknown>;
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
        slotProps={{ indicator: { children: <div /> } }}
        sx={(theme) => ({
          '& .MuiTabs-indicator > div': {
            backgroundColor: theme.palette.secondary.main,
          },
        })}
      >
        {pages.map((page) => (
          <Tab
            disableTouchRipple
            className={classes.tab}
            key={page.id}
            label={page.label}
            sx={(theme) => ({
              color: theme.palette.primary.main,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: theme.typography.subtitle1.fontSize,
              marginRight: theme.spacing(1),
            })}
          />
        ))}
      </Tabs>
      <MobileAppBarNavList pages={pages} />
    </>
  );
};

export default AppBarNavList as React.ComponentType<AppBarNavListProps>;
