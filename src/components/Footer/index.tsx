import React, { ReactElement } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Button,
} from '@mui/material';
import classes from './styles/footer.module.css';
import Colors from '../../styling/Colors';

export interface FooterItem {
  label: string;
  render?: (renderLabel: () => ReactElement) => ReactElement;
  onClickItem?: (args?: unknown) => void;
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
        sx={{ color: Colors.white }}
        primary={item.label}
        slotProps={{
          primary: {
            style: {
              fontSize: 14,
              fontFamily: 'MontSerrat, MontSerrat Variable',
              fontWeight: 400,
            },
          },
        }}
      />
    );

  return (
    <Box
      sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
      className={classes.footer}
    >
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
          <Box sx={{ color: Colors.white }} className={classes.serviceNameText}>
            {serviceNameText}
          </Box>
          <List className={classes.list}>
            {items.map((item, i) => (
              <ListItem
                key={i + item.label}
                classes={{
                  root: classes.item,
                }}
                sx={{ '& .MuiButton-root': { color: Colors.white } }}
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
