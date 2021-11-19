import React, { ReactElement } from 'react';
import { List, ListItem, ListItemText, Container } from '@mui/material';
import { useFooterStyles } from './styles';

export interface FooterItem {
  label: string;
  render?: (renderLabel: () => ReactElement) => ReactElement;
  onClickItem?: (args?: any) => void;
}

interface FooterProps {
  items: FooterItem[];
}

const Footer: React.FC<FooterProps> = ({ items }) => {
  const { classes } = useFooterStyles();

  const renderItem = (text: string) => (
    <ListItemText
      className={classes.itemText}
      primary={text}
      primaryTypographyProps={{ style: { fontSize: 14 } }}
    />
  );

  return (
    <div className={classes.footer}>
      <Container>
        <List className={classes.list}>
          {items.map(({ label, render, onClickItem }, i) => (
            <ListItem
              key={i}
              classes={{
                root: classes.item,
                button: onClickItem ? classes.itemBtn : undefined,
              }}
              onClick={onClickItem}
              button={!!onClickItem as any}
            >
              {render ? render(() => renderItem(label)) : renderItem(label)}
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default Footer as React.ComponentType<FooterProps>;
