import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {
  StyledFooter,
  listItemStyles,
  StyledFooterItemText,
} from './footerItemsStyles';

export interface FooterItem {
  label: string;
  onClickItem?: (args?: any) => any;
}
export interface FooterItemsProps {
  items: FooterItem[];
}

const FooterItems: React.FC<FooterItemsProps> = props => {
  const classes = listItemStyles({});

  return (
    <StyledFooter>
      {props.items.map((item, index) =>
        typeof item.onClickItem === 'function' ? (
          <ListItem
            classes={{ root: classes.root, button: classes.button }}
            key={index}
            onClick={item.onClickItem}
            button
          >
            <StyledFooterItemText primary={item.label} />
          </ListItem>
        ) : (
          <ListItem classes={{ root: classes.root }} key={index}>
            <StyledFooterItemText primary={item.label} />
          </ListItem>
        ),
      )}
    </StyledFooter>
  );
};

export default FooterItems as React.ComponentType<FooterItemsProps>;
