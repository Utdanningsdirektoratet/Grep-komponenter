import React, { ReactElement } from 'react';
import { List, ListItem, ListItemText, Container, Box } from '@mui/material';
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

  const renderItem = (text: string) => (
    <ListItemText
      className={classes.itemText}
      primary={text}
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
      </Box>
    </Box>
  );
};

export default Footer as React.ComponentType<FooterProps>;
