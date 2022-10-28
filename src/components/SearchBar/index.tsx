import * as React from 'react';
import Close from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search';
import { Button, Box, TextField, Typography } from '@mui/material';

import { useStyles } from './styles';
import { Colors } from '../../styling';
import { keyboard } from '../../utils';

export interface SearchBarProps {
  helpText?: string;
  outlined?: boolean;
  autoFocus?: boolean;
  initValue?: string;
  placeholder?: string;
  searchAllText?: string;
  onClear: () => void;
  onSearchAll?: () => void;
  onInputChange: (value: string) => void;
  id?: string;
  title?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState(props.initValue || '');

  const { classes } = useStyles();

  React.useEffect(() => {
    if (props.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  });

  const _handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const newVal = event.target.value;
    setValue(newVal);
    props.onInputChange(newVal);
  };

  const _handleClear = () => {
    setValue('');
    props.onClear();
  };

  return (
    <React.Fragment>
      <Box
        className={classes.outer}
        data-testid="searchBarContainer"
        style={{
          border: props.outlined ? `1px solid ${Colors.lightGrey}` : 0,
        }}
      >
        <Box className={classes.icon}>
          <Search />
        </Box>
        <TextField
          id={props.id}
          className={classes.input}
          value={value}
          title={props.title}
          variant="standard"
          inputRef={inputRef}
          onChange={_handleChange}
          autoFocus={props.autoFocus}
          placeholder={props.placeholder}
          InputProps={{ disableUnderline: true, fullWidth: true }}
        />
        <Box className={classes.icon} style={{ cursor: 'pointer' }}>
          {!!value.length && (
            <Close
              data-testid="searchBarClearBtn"
              tabIndex={0}
              onClick={_handleClear}
              onKeyPress={keyboard.onActivation(_handleClear)}
            />
          )}
        </Box>
      </Box>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.helpText && (
          <Typography className={classes.helptext}>{props.helpText}</Typography>
        )}
        {props.searchAllText && props.onSearchAll && (
          <Button color="primary" onClick={props.onSearchAll}>
            {props.searchAllText}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchBar as React.ComponentType<SearchBarProps>;
