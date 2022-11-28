import React, { ReactElement } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Button,
} from '@mui/material';
import { useFooterStyles } from './styles';

export interface FooterItem {
  label: string;
  render?: (renderLabel: () => ReactElement) => ReactElement;
  onClickItem?: (args?: any) => void;
}

interface FooterProps {
  items: FooterItem[];
  serviceNameText: string;
  udirLink: string;
  udirLogo: string;
}

const Footer: React.FC<FooterProps> = ({
  items,
  serviceNameText,
  udirLink,
  udirLogo,
}) => {
  const { classes } = useFooterStyles();

  const renderItem = (item: FooterItem) =>
    item.onClickItem ? (
      <Button
        className={classes.itemBtn.concat(' ' + classes.itemText)}
        onClick={item.onClickItem}
      >
        {item.label}
      </Button>
    ) : (
      <ListItemText
        className={classes.itemText}
        primary={item.label}
        primaryTypographyProps={{
          style: { fontSize: 14, fontFamily: 'Montserrat', fontWeight: 400 },
        }}
      />
    );

  return (
    <Box className={classes.footer}>
      <Box className={classes.content}>
        <a href={udirLink}>
          <img
            src={udirLogo}
            alt="Utdanningsdirektoratet logo"
            style={{ height: '43px', width: '150px' }}
          />
        </a>
        <Container
          sx={{
            maxWidth: '100% !important',
            paddingLeft: '16px !important',
            paddingRight: '16px !important',
          }}
        >
          <span className={classes.serviceNameText}>{serviceNameText}</span>
          <List className={classes.list}>
            {items.map((item, i) => (
              <ListItem
                key={i}
                classes={{
                  root: classes.item,
                  //button: onClickItem ? classes.itemBtn : undefined,
                }}
                //button={!!onClickItem as any}
              >
                {item.render
                  ? item.render(() => renderItem(item))
                  : renderItem(item)}
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer as React.ComponentType<FooterProps>;
